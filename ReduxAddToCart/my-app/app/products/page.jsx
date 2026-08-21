"use client"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../redux/features/cart/cartSlice'
import Image from 'next/image'; 


// Sample product data
// const products = [
//   { id: 1, name: "Laptop", price: 999, image: "💻" },
//   { id: 2, name: "Phone", price: 699, image: "📱" },
//   { id: 3, name: "Headphones", price: 199, image: "🎧" },
//   { id: 4, name: "Keyboard", price: 89, image: "⌨️" },
//   { id: 5, name: "Mouse", price: 49, image: "🖱️" },
//   { id: 6, name: "Monitor", price: 299, image: "🖥️" },
// ];
const Products = () => {
  const [allproducts, setAllProducts] = useState([])
  const dispatch = useDispatch()
  const { items } = useSelector((state) => state.cart)
//it says: Hey Redux, go to your storage, find the 'cart' section, and give me the 'items' from it."  
//useSelector	"A Redux hook that reads data from the store"

//a useeffect to fetch the api data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://dummyjson.com/products')
        const data = await res.json()
        setAllProducts(data.products) //this products name is from the api, api has it.

      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts()
  }, [])

  const handleAddToCart = (product) => {
    dispatch(addToCart(product))
    console.log(" Added to cart:", product.name);
    console.log(" Cart now has:", items.length + 1, "items");
  } 
  return (
    <div>
      <h1> Products</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {allproducts.map((product) => (
          <div key={product.id} style={{ border: "1px solid #ccc", padding: "16px" }}>
            <div style={{ fontSize: "48px", textAlign: "center" }}>{product.images?.[0] ? 
              <Image
              src={product.images[0]}
              alt={product.title}
              width={100}
              height={100}
              style={{ objectFit: 'contain' }}
              loading="lazy"  // ← Lazy loading by default
              placeholder="blur"  // ← Optional: shows blur effect
              blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23f0f0f0'/%3E%3C/svg%3E" //Optionalll placeholder
            /> : 'image'}</div>
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Products
