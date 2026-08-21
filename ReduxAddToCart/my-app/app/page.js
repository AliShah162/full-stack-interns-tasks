// app/page.jsx
import Link from "next/link";

export default function HomePage() {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Welcome to the Store!</h1>
      <p>Click Products to start shopping</p>
      <Link href="/products">
        <button style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}>
          Shop Now
        </button>
      </Link>
    </div>
  );
}