import sharp from "sharp";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MIME_BY_FORMAT = {
  webp: "image/webp",
  jpeg: "image/jpeg",
  png: "image/png",
};

function parseIntSafe(value, fallback, allowZero = false) {
  const parsed = Number(value);
  const min = allowZero ? 0 : 1;
  return Number.isFinite(parsed) && parsed >= min ? parsed : fallback;
}

async function buildCompressed(fileBuffer, targetBytes, format, maxWidth) {
  const metadata = await sharp(fileBuffer).metadata();
  const sourceWidth = metadata.width || 0;
  const enableResize = maxWidth > 0 && sourceWidth > maxWidth;
  const startQuality = format === "png" ? 95 : 92;
  const minQuality = format === "png" ? 35 : 25;
  const qualityStep = 4;
  const widthStarts = enableResize
    ? Array.from({ length: 8 }, (_, index) => Math.max(400, Math.floor(maxWidth * Math.pow(0.9, index))))
    : [undefined];

  let best = {
    size: Number.MAX_SAFE_INTEGER,
    data: fileBuffer,
    quality: startQuality,
    width: undefined,
  };

  for (const width of widthStarts) {
    for (let quality = startQuality; quality >= minQuality; quality -= qualityStep) {
      let image = sharp(fileBuffer);
      if (width) image = image.resize({ width, withoutEnlargement: true });

      let output;
      if (format === "jpeg") {
        output = image.jpeg({ quality, mozjpeg: true }).toBuffer();
      } else if (format === "png") {
        try {
          output = image.png({ quality, palette: true, compressionLevel: 9 }).toBuffer();
        } catch {
          output = image.png({ quality, compressionLevel: 9 }).toBuffer();
        }
      } else {
        output = image.webp({ quality }).toBuffer();
      }

      const buffer = await output;
      const currentSize = buffer.length;
      if (currentSize < best.size) {
        best = { size: currentSize, data: buffer, quality, width };
      }

      if (currentSize <= targetBytes) {
        return {
          buffer,
          quality,
          width,
          reachedTarget: true,
        };
      }
    }

    if (format === "jpeg" || format === "webp") {
      if (!enableResize) break;
      if (!width) break;
      if (width <= 400) break;
    }
  }

  return {
    buffer: best.data,
    quality: best.quality,
    width: best.width,
    reachedTarget: false,
  };
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("files");
    const ids = formData.getAll("ids");
    const targetKB = parseIntSafe(formData.get("targetKB"), 100, false);
    const format = formData.get("format") === "png" || formData.get("format") === "jpeg" ? formData.get("format") : "webp";
    const maxWidth = parseIntSafe(formData.get("maxWidth"), 0, true);

    if (!files.length) {
      return NextResponse.json({ error: "No images provided." }, { status: 400 });
    }

    const targetBytes = targetKB * 1024;
    const results = [];

    for (const item of files) {
      if (!(item instanceof File)) continue;
      const index = results.length;
      const id = ids[index] || item.name;
      const buffer = Buffer.from(await item.arrayBuffer());

      const compressed = await buildCompressed(buffer, targetBytes, format, maxWidth);
      const encoded = compressed.buffer.toString("base64");
      results.push({
        id: String(id),
        name: item.name,
        format,
        compressedSize: compressed.buffer.length,
        dataUrl: `data:${MIME_BY_FORMAT[format]};base64,${encoded}`,
        downloadName: `${item.name.split(".")[0]}.${format}`,
      });
    }

    return NextResponse.json({ results });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to process images." }, { status: 500 });
  }
}
