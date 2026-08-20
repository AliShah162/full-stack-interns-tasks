import { createSlice,nanoid } from "@reduxjs/toolkit"

const initialState={
    todos:[] //this  is the initialState where todos is just an array and new todos will be pushed
}


//now we create the slice
export const todoSlice=createSlice({
    name:'todo', //this is the name of slice
    initialState,  //then comes the initialState
    reducers:{
        addTodo:(state,action)=>{  //"addTodo" is the property and (state,action) is the function
            const todo={
                id: nanoid(), 
                text:action.payload  
            }
            state.todos.push(todo) //this will push new todos in the list
        },  
        removeTodo:(state,action)=>{
            state.todos=state.todos.filter((todo)=> todo.id !==action.payload) //means dont show the id that is clicked
        }
    }
})
//to export the reducer so that the store can use them
export const {addTodo,removeTodo}=todoSlice.actions
export default todoSlice.reducer