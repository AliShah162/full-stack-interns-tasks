// app/CompanyWebsite/products/[productId]/page.js
import Link from "next/link";

export default async function ProductPage({ params }) {
  const { productId } = await params;
  
  const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
  
  if (!res.ok) {
    return (
      <div>
        <h1>Product not found!</h1>
        <Link href="/CompanyWebsite/products">← Go back</Link>
      </div>
    );
  }
  
  const product = await res.json(); //jsonify after the check

  return (
    <div>
      <Link href="/CompanyWebsite/products" style={{ 
        color: '#0070f3', 
        textDecoration: 'none' 
      }}>
        ← Back to products
      </Link>

      <div style={{ marginTop: '2rem' }}>
        <h1>{product.title}</h1>
        <p><strong>Price:</strong> ${product.price}</p>
        <p><strong>Category:</strong> {product.category}</p>
        <p>{product.description}</p>
      </div>
    </div>
  );
}