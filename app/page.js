import Link from "next/link";
import { currency, products } from "./store-data";

export default function HomePage() {
  const featured = products.slice(0, 3);

  return (
    <main>
      <section className="hero">
        <div className="hero-media" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow">Pakistan-wide COD footwear store</p>
          <h1>Ammar Shoes</h1>
          <p>
            Sneakers, formal shoes, slippers, sandals, and kids footwear in one
            clean ecommerce experience built for Pakistani buyers.
          </p>
          <div className="hero-actions">
            <Link className="button primary" href="/shop">Shop collection</Link>
            <Link className="button ghost" href="/about">About brand</Link>
          </div>
        </div>
        <div className="hero-stats">
          <span>PKR pricing</span>
          <span>COD first</span>
          <span>7 day exchange</span>
        </div>
      </section>

      <section className="strip" aria-label="Delivery cities">
        <span>Karachi</span>
        <span>Lahore</span>
        <span>Islamabad</span>
        <span>Rawalpindi</span>
        <span>Faisalabad</span>
        <span>Multan</span>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <p className="eyebrow">Featured</p>
            <h2>Fast-selling footwear</h2>
          </div>
          <Link className="button dark" href="/shop">View full shop</Link>
        </div>
        <div className="product-grid three">
          {featured.map((product) => (
            <article className="product-card" key={product.id}>
              <img src={product.image} alt={`${product.name} shoes`} />
              <div className="product-body">
                <span className="badge">{product.badge}</span>
                <h3>{product.name}</h3>
                <p>{product.category} with durable finish and soft footbed.</p>
                <div className="price-row">
                  <strong>{currency(product.price)}</strong>
                  <del>{currency(product.oldPrice)}</del>
                </div>
                <Link className="button full" href="/shop">Shop now</Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
