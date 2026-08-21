import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";

export const store=configureStore({
    reducer:{
        cart:cartReducer,  //here 'cart' is the keyy for uss
    }
})