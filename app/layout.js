import "./globals.css";

export const metadata = {
  title: "Ammar Shoes | Pakistan Footwear Store",
  description:
    "Shop sneakers, formal shoes, slippers, and kids shoes in Pakistan with COD, exchange support, offers, and an admin-ready ecommerce plan.",
  keywords: [
    "shoes Pakistan",
    "sneakers Pakistan",
    "formal shoes",
    "slippers Pakistan",
    "COD shoes store",
  ],
  openGraph: {
    title: "Ammar Shoes | Pakistan Footwear Store",
    description:
      "SEO-friendly shoes ecommerce store for Pakistan with shop, cart, checkout, admin, offers, blog, and policy sections.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
