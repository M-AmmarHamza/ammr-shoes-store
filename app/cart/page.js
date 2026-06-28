import Link from "next/link";
import { currency, products } from "../store-data";

export default function CartPage() {
  const sampleCart = products.slice(0, 2);
  const subtotal = sampleCart.reduce((sum, item) => sum + item.price, 0);

  return (
    <main className="page">
      <section className="commerce-grid">
        <div className="checkout-panel">
          <p className="eyebrow">Cart</p>
          <h1>Your shopping cart</h1>
          <div className="cart-list">
            {sampleCart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt="" />
                <div>
                  <strong>{item.name}</strong>
                  <span>Size {item.sizes[0]} · {currency(item.price)}</span>
                </div>
                <div className="qty">
                  <button>-</button>
                  <span>1</span>
                  <button>+</button>
                </div>
              </div>
            ))}
          </div>
          <div className="total-line"><span>Subtotal</span><strong>{currency(subtotal)}</strong></div>
          <div className="total-line"><span>Delivery</span><strong>{currency(250)}</strong></div>
          <div className="grand-total"><span>Total</span><strong>{currency(subtotal + 250)}</strong></div>
          <Link className="button dark full" href="/shop">Continue shopping</Link>
        </div>

        <form className="checkout-panel">
          <p className="eyebrow">Checkout</p>
          <h2>Cash on delivery order</h2>
          <label>Full name<input placeholder="Muhammad Ammar" /></label>
          <label>Phone / WhatsApp<input placeholder="03XX XXXXXXX" /></label>
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
          <label>Address<textarea placeholder="House, street, area, landmark" /></label>
          <button className="button primary full" type="button">Place COD order</button>
        </form>
      </section>
    </main>
  );
}
