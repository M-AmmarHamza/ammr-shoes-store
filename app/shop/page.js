"use client";

import * as React from "react";
import { categories, currency, products } from "../store-data";

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = React.useState("All");
  const visibleProducts =
    activeCategory === "All"
      ? products
      : products.filter((product) => product.category === activeCategory);

  return (
    <main className="page">
      <section className="section flush">
        <div className="section-head">
          <div>
            <p className="eyebrow">Shop</p>
            <h1>All shoes, outlets, and categories</h1>
            <p className="muted wide">
              Sneakers, formal shoes, chappal/slippers, sandals, sports shoes,
              and kids shoes in one catalogue.
            </p>
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
                <p>{product.category} with COD, size exchange, and Pakistan delivery.</p>
                <div className="sizes">
                  {product.sizes.map((size) => (
                    <span key={size}>{size}</span>
                  ))}
                </div>
                <div className="price-row">
                  <strong>{currency(product.price)}</strong>
                  <del>{currency(product.oldPrice)}</del>
                </div>
                <button className="button full">Add to cart</button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
