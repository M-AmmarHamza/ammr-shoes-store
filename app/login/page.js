import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="page auth-page">
      <form className="auth-card">
        <p className="eyebrow">Login</p>
        <h1>Welcome back</h1>
        <label>Email or phone<input placeholder="you@example.com" /></label>
        <label>Password<input type="password" placeholder="Password" /></label>
        <button className="button primary full" type="button">Login</button>
        <p className="muted">New customer? <Link href="/signup">Create account</Link></p>
      </form>
    </main>
  );
}
