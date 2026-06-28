"use client";

import * as React from "react";

const TARGET_PRESETS = [50, 100, 200];

async function readFiles(fileList) {
  return Array.from(fileList).map((file) => ({
    id: crypto.randomUUID(),
    file,
    name: file.name,
    size: file.size,
    originalUrl: URL.createObjectURL(file),
  }));
}

function bytesToKB(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

function formatPercent(before, after) {
  if (!before || before <= 0) return "0.0";
  return ((1 - after / before) * 100).toFixed(1);
}

function formatResultCard(result, file) {
  const compression = formatPercent(file.size, result.compressedSize);
  return (
    <article className="result-card" key={result.id}>
      <div className="result-title">{result.name}</div>
      <div className="comparison">
        <figure>
          <img src={file.originalUrl} alt={`Original ${result.name}`} />
          <figcaption>Original</figcaption>
        </figure>
        <span className="arrow">→</span>
        <figure>
          <img src={result.dataUrl} alt={`Compressed ${result.name}`} />
          <figcaption>Compressed ({result.format.toUpperCase()})</figcaption>
        </figure>
      </div>
      <div className="result-stats">
        <span>Original: {bytesToKB(file.size)}</span>
        <span>Compressed: {bytesToKB(result.compressedSize)}</span>
        <span>Saved: {compression}%</span>
      </div>
      <a className="download-btn" href={result.dataUrl} download={result.downloadName}>
        Download
      </a>
    </article>
  );
}

export default function HomePage() {
  const [files, setFiles] = React.useState([]);
  const [results, setResults] = React.useState([]);
  const [processing, setProcessing] = React.useState(false);
  const [error, setError] = React.useState("");
  const [preset, setPreset] = React.useState("100");
  const [customSize, setCustomSize] = React.useState(150);
  const [format, setFormat] = React.useState("webp");
  const [resize, setResize] = React.useState(true);

  const targetKB = preset === "custom" ? Number(customSize) : Number(preset);

  const onFilesPicked = React.useCallback(async (picked) => {
    setError("");
    const list = await readFiles(picked);
    setFiles((prev) => [...prev, ...list]);
  }, []);

  const removeFile = React.useCallback((id) => {
    setFiles((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const onDrop = React.useCallback(
    (event) => {
      event.preventDefault();
      const filesFromDrop = event.dataTransfer?.files;
      if (!filesFromDrop?.length) return;
      onFilesPicked(filesFromDrop);
    },
    [onFilesPicked]
  );

  const onBrowse = React.useCallback(
    (event) => {
      const picked = event.target.files;
      if (!picked?.length) return;
      onFilesPicked(picked);
      event.target.value = "";
    },
    [onFilesPicked]
  );

  const clearAll = React.useCallback(() => {
    setFiles([]);
    setResults([]);
    setError("");
  }, []);

  const compressNow = React.useCallback(async () => {
    if (!files.length) return;
    if (!Number.isFinite(targetKB) || targetKB <= 0) {
      setError("Please select a valid target size in KB.");
      return;
    }

    setProcessing(true);
    setError("");

    try {
      const form = new FormData();
      files.forEach((f) => form.append("files", f.file));
      files.forEach((f) => form.append("ids", f.id));
      form.append("targetKB", String(targetKB));
      form.append("format", format);
      form.append("maxWidth", resize ? "1200" : "0");

      const res = await fetch("/api/compress", {
        method: "POST",
        body: form,
      });

      const payload = await res.json();
      if (!res.ok) throw new Error(payload?.error || "Compression failed.");

      setResults(payload.results || []);
    } catch (err) {
      setError(err.message || "Unknown compression error.");
    } finally {
      setProcessing(false);
    }
  }, [files, format, resize, targetKB]);

  return (
    <main className="shell">
      <section className="panel">
        <h1>Image Compression Studio</h1>
        <p className="lead">
          Upload one or many images, pick a size target, and generate WebP by
          default with optional JPEG/PNG output.
        </p>

        <section
          className="dropzone"
          onDragOver={(event) => event.preventDefault()}
          onDrop={onDrop}
        >
          <div className="dropzone-copy">Drag and drop images here</div>
          <span>or</span>
          <label className="browse-btn">
            Select files
            <input
              id="upload"
              type="file"
              accept="image/*"
              multiple
              onChange={onBrowse}
            />
          </label>
        </section>

        <section className="controls">
          <div className="field">
            <label htmlFor="size">Target Size</label>
            <select
              id="size"
              value={preset}
              onChange={(event) => setPreset(event.target.value)}
            >
              {TARGET_PRESETS.map((value) => (
                <option key={value} value={String(value)}>
                  {value} KB
                </option>
              ))}
              <option value="custom">Custom</option>
            </select>
            {preset === "custom" && (
              <input
                type="number"
                min="1"
                value={customSize}
                onChange={(event) =>
                  setCustomSize(Number(event.target.value) || 1)
                }
              />
            )}
          </div>

          <div className="field">
            <label htmlFor="format">Output Format</label>
            <select
              id="format"
              value={format}
              onChange={(event) => setFormat(event.target.value)}
            >
              <option value="webp">WebP (default)</option>
              <option value="jpeg">JPEG</option>
              <option value="png">PNG</option>
            </select>
          </div>

          <label className="toggle">
            <input
              type="checkbox"
              checked={resize}
              onChange={(event) => setResize(event.target.checked)}
            />
            <span>Resize wide images to max 1200px (unless unchecked)</span>
          </label>
        </section>

        {error && <p className="error">{error}</p>}

        {files.length > 0 && (
          <section className="file-actions">
            <button className="clear-btn" onClick={clearAll}>
              Clear Files
            </button>
            <button
              className="primary-btn"
              onClick={compressNow}
              disabled={processing}
            >
              {processing ? "Compressing..." : "Compress"}
            </button>
          </section>
        )}

        {files.length > 0 && (
          <section className="stack">
            {files.map((file) => (
              <article className="thumb-card" key={file.id}>
                <img src={file.originalUrl} alt={file.name} />
                <div className="thumb-meta">
                  <h3>{file.name}</h3>
                  <p>{bytesToKB(file.size)}</p>
                  <button onClick={() => removeFile(file.id)}>Remove</button>
                </div>
              </article>
            ))}
          </section>
        )}
      </section>

      {results.length > 0 && (
        <section className="panel results">
          <h2>Before / After</h2>
          <div className="result-grid">
            {results.map((result) => {
              const original = files.find((f) => f.id === result.id);
              if (!original) return null;
              return formatResultCard(result, original);
            })}
          </div>
        </section>
      )}
    </main>
  );
}
