"use client";
import { useSelector } from "react-redux";
import Link from "next/link";

export default function Navbar() {
  const { totalQuantity } = useSelector((state) => state.cart);
  //This means: Go to the Redux store. Find the 'cart' slice (which you defined in your slice file). Get the totalQuantity value from that slice's state.
  //{totalQuantity} is the same name variable present in the cart slice, they must match, cant write 'MytotalQuantity'
  return (
    <nav style={{ borderBottom: "1px solid #ccc", padding: "12px 20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <Link href="/">Home</Link>
          <Link href="/products" style={{ marginLeft: "16px" }}>Products</Link>
        </div>
        <div>
          <Link href="/cart">
            🛒 Cart ({totalQuantity})
          </Link>
        </div>
      </div>
    </nav>
  );
}