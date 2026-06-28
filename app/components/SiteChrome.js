import Link from "next/link";
import { policies } from "../store-data";

const navLinks = [
  ["Home", "/"],
  ["Shop", "/shop"],
  ["Cart", "/cart"],
  ["About Us", "/about"],
  ["Contact Us", "/contact"],
];

export function Header() {
  return (
    <header className="nav">
      <Link className="brand" href="/" aria-label="Ammar Shoes home">
        <span>AS</span>
        Ammar Shoes
      </Link>
      <nav className="nav-links" aria-label="Main navigation">
        {navLinks.map(([label, href]) => (
          <Link key={href} href={href}>
            {label}
          </Link>
        ))}
        <Link className="account-link" href="/login">
          Account
        </Link>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <Link className="brand" href="/">
          <span>AS</span>
          Ammar Shoes
        </Link>
        <p>
          Pakistan-focused ecommerce store for sneakers, formal shoes, slippers,
          sandals, and kids footwear with COD and exchange support.
        </p>
      </div>

      <div className="footer-col">
        <h3>Store</h3>
        <Link href="/shop">Shop all shoes</Link>
        <Link href="/cart">Cart</Link>
        <Link href="/about">About us</Link>
        <Link href="/contact">Contact us</Link>
      </div>

      <div className="footer-col">
        <h3>Account</h3>
        <Link href="/login">Login</Link>
        <Link href="/signup">Sign up</Link>
        <Link href="/admin">Admin panel</Link>
      </div>

      <div className="footer-col">
        <h3>Policies</h3>
        {policies.map(([title, , href]) => (
          <Link key={href} href={href}>
            {title}
          </Link>
        ))}
      </div>

      <div className="footer-bottom">
        <span>PKR pricing</span>
        <span>Cash on delivery</span>
        <span>WhatsApp support</span>
        <span>Pakistan delivery</span>
      </div>
    </footer>
  );
}
