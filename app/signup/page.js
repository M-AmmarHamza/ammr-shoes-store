import Link from "next/link";

export default function SignupPage() {
  return (
    <main className="page auth-page">
      <form className="auth-card">
        <p className="eyebrow">Sign up</p>
        <h1>Create account</h1>
        <label>Full name<input placeholder="Muhammad Ammar" /></label>
        <label>Email or phone<input placeholder="03XX XXXXXXX" /></label>
        <label>Password<input type="password" placeholder="Password" /></label>
        <button className="button primary full" type="button">Sign up</button>
        <p className="muted">Already registered? <Link href="/login">Login</Link></p>
      </form>
    </main>
  );
}
