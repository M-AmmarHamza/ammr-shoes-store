export const products = [
  {
    id: "urban-runner",
    name: "Urban Runner Knit",
    category: "Sneakers",
    price: 7490,
    oldPrice: 8990,
    sizes: ["40", "41", "42", "43"],
    badge: "18% off",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "office-classic",
    name: "Office Classic Derby",
    category: "Formal Shoes",
    price: 9990,
    oldPrice: 11990,
    sizes: ["39", "40", "41", "42", "44"],
    badge: "Best seller",
    image:
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "comfort-slide",
    name: "Daily Comfort Slides",
    category: "Slippers",
    price: 2490,
    oldPrice: 3290,
    sizes: ["38", "39", "40", "41", "42"],
    badge: "COD ready",
    image:
      "https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "school-step",
    name: "Kids School Step",
    category: "Kids Shoes",
    price: 3990,
    oldPrice: 4590,
    sizes: ["29", "30", "31", "32", "33"],
    badge: "New",
    image:
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "daily-sandal",
    name: "Soft Strap Sandals",
    category: "Sandals",
    price: 3190,
    oldPrice: 3890,
    sizes: ["39", "40", "41", "42", "43"],
    badge: "Summer pick",
    image:
      "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "training-flex",
    name: "Training Flex Sports",
    category: "Sports Shoes",
    price: 8490,
    oldPrice: 9990,
    sizes: ["40", "41", "42", "43", "44"],
    badge: "Hot",
    image:
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=900&q=80",
  },
];

export const categories = [
  "All",
  "Sneakers",
  "Formal Shoes",
  "Slippers",
  "Kids Shoes",
  "Sandals",
  "Sports Shoes",
];

export const policies = [
  ["Shipping Policy", "2-5 working days delivery in major Pakistan cities with COD support.", "/shipping-policy"],
  ["Return & Exchange", "Unused products can be exchanged within 7 days for size or defect issues.", "/return-policy"],
  ["Privacy Policy", "Customer data, phone numbers, addresses, and order details are handled carefully.", "/privacy-policy"],
  ["Terms & Conditions", "Clear rules for orders, pricing, cancellations, refunds, and product availability.", "/terms"],
];

export function currency(value) {
  return `PKR ${value.toLocaleString("en-PK")}`;
}
