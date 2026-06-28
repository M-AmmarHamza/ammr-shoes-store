"use client";

import * as React from "react";

const products = [
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
    category: "Formal",
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
    category: "Kids",
    price: 3990,
    oldPrice: 4590,
    sizes: ["29", "30", "31", "32", "33"],
    badge: "New",
    image:
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=900&q=80",
  },
];

const policies = [
  ["Shipping", "2-5 working days across major Pakistan cities with COD support."],
  ["Exchange", "Size exchange requests accepted within 7 days on unused products."],
  ["Privacy", "Customer phone, address, and order details stay protected and private."],
  ["Support", "WhatsApp-first support for order updates, returns, and quick questions."],
];

const adminItems = [
  ["Products", "Add sizes, colors, sale prices, stock, and image galleries."],
  ["Orders", "Move orders from pending to confirmed, shipped, delivered, or returned."],
  ["Offers", "Create coupons, homepage sale banners, and scheduled discounts."],
  ["Blog", "Publish SEO posts for sneakers, formal shoes, slippers, and size guides."],
];

function currency(value) {
  return `PKR ${value.toLocaleString("en-PK")}`;
}

export default function HomePage() {
  const [cart, setCart] = React.useState([]);
  const [activeCategory, setActiveCategory] = React.useState("All");

  const categories = ["All", ...new Set(products.map((product) => product.category))];
  const visibleProducts =
    activeCategory === "All"
      ? products
      : products.filter((product) => product.category === activeCategory);
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  function addToCart(product) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...current, { ...product, qty: 1, selectedSize: product.sizes[0] }];
    });
  }

  function changeQty(id, direction) {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id ? { ...item, qty: Math.max(0, item.qty + direction) } : item
        )
        .filter((item) => item.qty > 0)
    );
  }

  return (
    <main>
      <nav className="nav">
        <a className="brand" href="#home" aria-label="Ammar Shoes home">
          <span>AS</span>
          Ammar Shoes
        </a>
        <div className="nav-links">
          <a href="#shop">Shop</a>
          <a href="#cart">Cart</a>
          <a href="#admin">Admin</a>
          <a href="#policies">Policies</a>
        </div>
      </nav>

      <section className="hero" id="home">
        <div className="hero-media" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow">Pakistan-wide COD footwear store</p>
          <h1>Ammar Shoes</h1>
          <p>
            Sneakers, formals, slippers, and kids shoes with fast checkout,
            size exchange, and SEO-ready product pages.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#shop">Shop collection</a>
            <a className="button ghost" href="#admin">View admin plan</a>
          </div>
        </div>
        <div className="hero-stats">
          <span>PKR pricing</span>
          <span>COD first</span>
          <span>7 day exchange</span>
        </div>
      </section>

      <section className="strip" aria-label="Store promises">
        <span>Karachi</span>
        <span>Lahore</span>
        <span>Islamabad</span>
        <span>Rawalpindi</span>
        <span>Faisalabad</span>
        <span>Multan</span>
      </section>

      <section className="section" id="shop">
        <div className="section-head">
          <div>
            <p className="eyebrow">Shop</p>
            <h2>Compact catalogue for daily selling</h2>
          </div>
          <div className="filters" aria-label="Product filters">
            {categories.map((category) => (
              <button
                key={category}
                className={activeCategory === category ? "active" : ""}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="product-grid">
          {visibleProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <img src={product.image} alt={`${product.name} shoes`} />
              <div className="product-body">
                <span className="badge">{product.badge}</span>
                <h3>{product.name}</h3>
                <p>{product.category} shoes with durable finish and soft footbed.</p>
                <div className="sizes">
                  {product.sizes.map((size) => (
                    <span key={size}>{size}</span>
                  ))}
                </div>
                <div className="price-row">
                  <strong>{currency(product.price)}</strong>
                  <del>{currency(product.oldPrice)}</del>
                </div>
                <button className="button full" onClick={() => addToCart(product)}>
                  Add to cart
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="commerce-grid" id="cart">
        <div className="checkout-panel">
          <p className="eyebrow">Cart</p>
          <h2>Quick order review</h2>
          {cart.length === 0 ? (
            <p className="muted">Cart empty hai. Shop se koi product add karein.</p>
          ) : (
            <div className="cart-list">
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt="" />
                  <div>
                    <strong>{item.name}</strong>
                    <span>Size {item.selectedSize} · {currency(item.price)}</span>
                  </div>
                  <div className="qty">
                    <button onClick={() => changeQty(item.id, -1)}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => changeQty(item.id, 1)}>+</button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="total-line">
            <span>Subtotal</span>
            <strong>{currency(total)}</strong>
          </div>
          <div className="total-line">
            <span>Delivery</span>
            <strong>{total ? currency(250) : currency(0)}</strong>
          </div>
          <div className="grand-total">
            <span>Total</span>
            <strong>{currency(total ? total + 250 : 0)}</strong>
          </div>
        </div>

        <form className="checkout-panel">
          <p className="eyebrow">Checkout</p>
          <h2>Cash on delivery order</h2>
          <label>
            Full name
            <input placeholder="Muhammad Ammar" />
          </label>
          <label>
            Phone / WhatsApp
            <input placeholder="03XX XXXXXXX" />
          </label>
          <label>
            City
            <select defaultValue="Karachi">
              <option>Karachi</option>
              <option>Lahore</option>
              <option>Islamabad</option>
              <option>Rawalpindi</option>
              <option>Faisalabad</option>
              <option>Multan</option>
            </select>
          </label>
          <label>
            Address
            <textarea placeholder="House, street, area, landmark" />
          </label>
          <button className="button primary full" type="button">Place COD order</button>
        </form>
      </section>

      <section className="section" id="admin">
        <div className="section-head">
          <div>
            <p className="eyebrow">Admin panel</p>
            <h2>Controls for offers, products, news, and orders</h2>
          </div>
          <a className="button ghost" href="#policies">See policies</a>
        </div>
        <div className="admin-board">
          <div className="admin-main">
            <div className="admin-metric">
              <span>Today orders</span>
              <strong>24</strong>
            </div>
            <div className="admin-metric">
              <span>Revenue</span>
              <strong>PKR 186k</strong>
            </div>
            <div className="admin-metric">
              <span>Low stock</span>
              <strong>8</strong>
            </div>
          </div>
          {adminItems.map(([title, text]) => (
            <article className="admin-card" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="policy-band" id="policies">
        <div>
          <p className="eyebrow">Legal and trust pages</p>
          <h2>Ready pages for a Pakistan ecommerce launch</h2>
        </div>
        <div className="policy-grid">
          {policies.map(([title, text]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="blog-row">
        <article>
          <p className="eyebrow">Blog</p>
          <h2>SEO topics to publish first</h2>
        </article>
        <a href="#shop">Best sneakers in Pakistan</a>
        <a href="#shop">Formal shoes size guide</a>
        <a href="#shop">Daily slippers buying tips</a>
      </section>
    </main>
  );
}
