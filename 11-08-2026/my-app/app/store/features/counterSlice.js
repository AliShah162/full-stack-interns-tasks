import { createSlice } from '@reduxjs/toolkit'
// STEP 1: What's the starting number?
const initialState={
    value:0
}
// STEP 2: Create the slice (the rulebook)
const counterSlice =createSlice({
    name:'counter', //name og the slice
    initialState, //initial slice

  // STEP 3: Define the rules (reducers)
    reducers:{    //these are the reducers
        //rule 1, increase by 1
        increament:(state)=>{
            state.value+=1
        },

        //rule 2, deacrease by 1
        decreament:(state)=>{
            state.value -=1
        },
        //rule 3, reset to 0
        reset:(state)=>{ 
            state.value=0
        }
    }

})

// step 4, export the actions
export const {increament,decreament, reset} =counterSlice.actions
//step 5, export the reducer, the person who follows rules
export default counterSlice.reducer