export default function ContactPage() {
  return (
    <main className="page">
      <section className="text-page">
        <p className="eyebrow">Contact us</p>
        <h1>Support for orders, sizes, and returns</h1>
        <p>
          Customers can contact the store for order confirmation, size help,
          delivery updates, and exchange requests.
        </p>
        <form className="contact-form">
          <label>Name<input placeholder="Your name" /></label>
          <label>Phone / WhatsApp<input placeholder="03XX XXXXXXX" /></label>
          <label>Message<textarea placeholder="How can we help?" /></label>
          <button className="button primary" type="button">Send message</button>
        </form>
      </section>
    </main>
  );
}
