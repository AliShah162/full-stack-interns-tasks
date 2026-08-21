"use client";
import { useSelector, useDispatch } from "react-redux";
import { removeCart, clearCart } from "../redux/features/cart/cartSlice";
import Image from "next/image";

const CartPage = () => {
    const dispatch = useDispatch()
    const { items, totalQuantity, totalPrice } = useSelector((state) => state.cart)

    const handleRemove = (product) => { //to remove an item from the cart
        dispatch(removeCart(product))
        console.log("Removed from cart", product.name);
    }

    const handleClearCart = () => { //to remove all the items from the cart
        dispatch(clearCart())
        console.log("Cart Cleared!");
    }
    if (items.length === 0) {
        <div>
            <h1>Your Cart</h1>
            <p>Your cart is empty. Add Items! </p>
        </div>
    }
    return (
        <div>
            <h1>Your Cart have ({totalQuantity} items)</h1>
            {items.map((item) => (
                <div key={item.id} style={{ borderBottom: "1px solid #ccc", padding: "12px 0" }}>
                    <span>
                        {item.images && item.images[0] ? (
                            <Image
                                src={item.images[0]}
                                alt={item.title}
                                width={50}
                                height={50}
                                style={{ objectFit: "contain" }}
                                className="cart-image"
                            />
                        ) : (
                            "📦"
                        )}
                    </span>
                    <span>{item.title}</span> {/* ← Changed from "name" to "title" */}
                    <span>${item.price} x {item.quantity} = ${item.totalPrice}</span>
                    <button onClick={() => handleRemove(item)}>Remove</button>
                </div>
            ))}

            <div style={{ marginTop: "20px", borderTop: "2px solid #000", paddingTop: "20px" }}>
                <h3>Total: ${totalPrice}</h3>
                <button onClick={handleClearCart}>Clear Cart</button>
            </div>
        </div>
    )
}

export default CartPage
