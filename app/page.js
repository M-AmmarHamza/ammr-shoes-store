import Link from "next/link";
import { currency, products } from "./store-data";

export default function HomePage() {
  const featured = products.slice(0, 3);
  const categories = [
    ["Sneakers", "Street-ready comfort for college, office, and daily wear.", products[0].image],
    ["Formal Shoes", "Polished pairs for meetings, weddings, and work days.", products[1].image],
    ["Slippers", "Soft daily chappal and slides for relaxed Pakistani weather.", products[2].image],
    ["Kids Shoes", "Durable school and play shoes with easy size guidance.", products[3].image],
  ];
  const stories = [
    ["Size exchange", "7 day exchange support for unused pairs, so sizing feels less risky."],
    ["COD checkout", "Cash on delivery first, with phone confirmation before dispatch."],
    ["Local support", "WhatsApp-friendly service for order status, returns, and fit advice."],
  ];
  const blogPosts = [
    "Best sneakers in Pakistan for daily wear",
    "How to choose formal shoes for office and events",
    "Slippers, sandals, or slides: what should you buy?",
  ];
  const cities = [
    ["Karachi", "Sindh capital", "Mazar-e-Quaid", "https://images.unsplash.com/photo-1609948543911-7f01ff385be5?auto=format&fit=crop&w=700&q=80"],
    ["Lahore", "Punjab capital", "Minar-e-Pakistan", "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=700&q=80"],
    ["Islamabad", "Pakistan capital", "Faisal Mosque", "https://images.unsplash.com/photo-1578357237164-5831adfed695?auto=format&fit=crop&w=700&q=80"],
    ["Peshawar", "KPK capital", "Qissa Khwani Bazaar", "https://images.unsplash.com/photo-1627894006066-b45720af0803?auto=format&fit=crop&w=700&q=80"],
    ["Quetta", "Balochistan capital", "Hanna Lake region", "https://images.unsplash.com/photo-1626198226928-6174bf6c9e8f?auto=format&fit=crop&w=700&q=80"],
  ];

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

      <section className="city-strip" aria-label="Pakistan capital city delivery coverage">
        {cities.map(([city, role, landmark, image]) => (
          <article key={city}>
            <img src={image} alt={`${landmark} representing ${city}`} />
            <div>
              <span>{role}</span>
              <strong>{city}</strong>
              <p>{landmark}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="category-showcase">
        <div className="section-head">
          <div>
            <p className="eyebrow">Categories</p>
            <h2>Shop by purpose</h2>
          </div>
          <p className="muted wide">
            Homepage ko simple rakhte hue direct buying paths: daily sneakers,
            office formals, slippers, sandals, sports, and kids footwear.
          </p>
        </div>
        <div className="category-grid">
          {categories.map(([title, text, image]) => (
            <Link className="category-tile" href="/shop" key={title}>
              <img src={image} alt={`${title} category`} />
              <span>{title}</span>
              <p>{text}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="offer-band">
        <div>
          <p className="eyebrow">Launch offer</p>
          <h2>Weekend footwear drop</h2>
          <p>
            Featured pairs, size exchange, and COD confirmation for first-time
            customers across major Pakistan cities.
          </p>
        </div>
        <Link className="button light" href="/shop">Explore sale picks</Link>
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

      <section className="experience-band">
        <div className="experience-copy">
          <p className="eyebrow">Why Ammar Shoes</p>
          <h2>Built around Pakistani shopping habits</h2>
          <p>
            Buyers want clear prices, honest delivery timing, easy exchange
            rules, and fast support. The homepage now leads customers through
            trust, categories, featured products, and checkout confidence before
            they reach the footer.
          </p>
        </div>
        <div className="story-grid">
          {stories.map(([title, text]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="lookbook">
        <div>
          <p className="eyebrow">Lookbook</p>
          <h2>Daily wear, office polish, weekend comfort</h2>
        </div>
        <div className="lookbook-grid">
          <img src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=900&q=80" alt="Sneakers lifestyle" />
          <img src="https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=900&q=80" alt="Sport shoes closeup" />
          <img src="https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=900&q=80" alt="Casual shoes display" />
        </div>
      </section>

      <section className="home-news">
        <div>
          <p className="eyebrow">News and buying guides</p>
          <h2>SEO content ready for launch</h2>
        </div>
        <div className="news-list">
          {blogPosts.map((post) => (
            <Link href="/shop" key={post}>{post}</Link>
          ))}
        </div>
      </section>

      <section className="newsletter">
        <div>
          <p className="eyebrow">Stay updated</p>
          <h2>Get sale alerts and new arrivals</h2>
          <p>Customers can later subscribe by email or WhatsApp for offers.</p>
        </div>
        <form>
          <input placeholder="Email or WhatsApp number" />
          <button className="button primary" type="button">Notify me</button>
        </form>
      </section>
    </main>
  );
}
