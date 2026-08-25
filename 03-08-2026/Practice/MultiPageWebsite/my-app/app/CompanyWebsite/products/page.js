// app/products/page.js
import Link from "next/link";

export default async function Products() {
  const res=await fetch('https://fakestoreapi.com/products')
  const products=await res.json()

  return (
    <div>
      <h1>All Products</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
        {products.map((product) => (
          <div key={product.id} style={{ 
            border: '1px solid #ddd', 
            padding: '1.5rem', 
            borderRadius: '8px' 
          }}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p><strong>{product.price}</strong></p>
            <Link href={`/CompanyWebsite/products/${product.id}`} style={{ 
              color: '#0070f3', 
              textDecoration: 'none',
              display: 'inline-block',
              marginTop: '1rem'
            }}>
              View Details →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}