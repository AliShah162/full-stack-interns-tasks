// app/products/page.js
import Link from "next/link";

export default function Products() {
  const products = [
    { id: "chair", name: "Chair", price: "$49.99", description: "Comfortable wooden chair" },
    { id: "spoon", name: "Spoon", price: "$4.99", description: "Stainless steel spoon" },
    { id: "plate", name: "Plate", price: "$12.99", description: "Ceramic dinner plate" },
    { id: "charger", name: "Charger", price: "$29.99", description: "Fast phone charger" },
    { id: "football", name: "Football", price: "$39.99", description: "Official size football" },
  ];

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
            <Link href={`/products/${product.id}`} style={{ 
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