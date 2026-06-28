const adminItems = [
  ["Products", "Add shoes, categories, sizes, colors, prices, stock, and images."],
  ["Orders", "Manage pending, confirmed, shipped, delivered, cancelled, and returned orders."],
  ["Offers", "Create homepage banners, coupons, percentage discounts, and sale campaigns."],
  ["News & Blog", "Publish SEO posts, announcements, buying guides, and brand updates."],
];

export default function AdminPage() {
  return (
    <main className="page">
      <section className="section flush">
        <div className="section-head">
          <div>
            <p className="eyebrow">Admin panel</p>
            <h1>Store control room</h1>
            <p className="muted wide">Admin area footer me linked hai; yahan store owner products, offers, news, blog posts, and orders manage karega.</p>
          </div>
        </div>
        <div className="admin-board">
          <div className="admin-main">
            <div className="admin-metric"><span>Today orders</span><strong>24</strong></div>
            <div className="admin-metric"><span>Revenue</span><strong>PKR 186k</strong></div>
            <div className="admin-metric"><span>Low stock</span><strong>8</strong></div>
          </div>
          {adminItems.map(([title, text]) => (
            <article className="admin-card" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
