// app/products/[productId]/page.js
import Link from "next/link";

export default async function ProductPage({ params }) {
  const { productId } = await params;
  
  // Simple product data
  const products = {
    chair: { name: "Chair", price: "$49.99" },
    spoon: { name: "Spoon", price: "$4.99" },
    plate: { name: "Plate", price: "$12.99" },
    charger: { name: "Charger", price: "$29.99" },
    football: { name: "Football", price: "$39.99" },
  };

  const product = products[productId];

//   // If product doesn't exist, show error
//   if (!product) {
//     return (
//       <div>
//         <h1>Product not found!</h1>
//         <Link href="/products">← Go back</Link>
//       </div>
//     );
//   }

  return (
    <div>

      <Link href="/products">← Back to products</Link>
      {product ?(
        <>
        <h1>{product.name}</h1>
        <p>Price: {product.price}</p>

        </>

      ):(
        <div style={{ marginTop: '2rem' }}>
          <h1>Product: {productId}</h1>
          <p>This is a new product you are viewing: <strong>{productId}</strong></p>
          <p>Add this product to your catalog!</p>
        </div>
      )
    }
    </div>
  );
}