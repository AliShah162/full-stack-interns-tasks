import { createSlice } from "@reduxjs/toolkit";
const initialState={   //cal it state or initial state
    items:[],
    totalQuantity:0,
    totalPrice:0,
};

const cartSlice=createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart:(state,action)=>{
            const product=action.payload //  product gets the value from action.payload
    // Now product = whatever you passed in dispatch()
            const existingItem= state.items.find(item=> item.id === product.id)

            //agr same item pehle se hai to aik or add kr do, ni to simply new item push kr do!
            if(existingItem){
                // If item exists, increase quantity by 1
                existingItem.quantity+=1
                existingItem.totalPrice=existingItem.quantity * existingItem.price;
            }
            else{
               // If item is new, add it
                state.items.push({
                    ...product,
                    quantity:1,
                    totalPrice:product.price
                })
            }
            // Update totals
            state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
            state.totalPrice = state.items.reduce((sum, item) => sum + item.totalPrice, 0);
        },
        //second reducer tooo remove fromm cart
        removeCart:(state,action)=>{
            const product=action.payload
            const existingItem= state.items.find(item=>item.id===product.id)
            if(existingItem){ //agr existingitem hai
                if(existingItem.quantity ===1){ //agr kam az kam aik bhi hai to.....
                    //remove item completely
                    state.items=state.items.filter(item=>item.id !== product.id)
                }
                else{
                    //decrase the quantity justt
                    existingItem.quantity -=1
                    existingItem.totalPrice = existingItem.quantity * existingItem.price;
                }
            }
            // Update totals
            state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
            state.totalPrice = state.items.reduce((sum, item) => sum + item.totalPrice, 0);
        },

        //3rd reducer to clear the cart
        clearCart:(state,action)=>{
            state.items=[],
            state.totalPrice=0,
            state.totalQuantity=0
        }
    }
})

export const {addToCart,removeCart,clearCart}=cartSlice.actions
export default cartSlice.reducer;