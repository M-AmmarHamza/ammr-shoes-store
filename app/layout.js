import "./globals.css";

export const metadata = {
  title: "Image Compression Studio",
  description: "Upload, preview, and compress images with target size control.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
