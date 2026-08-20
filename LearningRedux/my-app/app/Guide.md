* so first of all create a blank store with just configureStore from redux
then we will create the slice in feature folder, for that, first create the initial state 
after initialState we make our slice, in that slice, after writing slice name, comes the reducer.
like i created 2 reducers: addTodo and removeTodo.
in a reducer we have two things, reducer property and its function

reducers:{
    addTodo:(state,action)=>{   //"addTodo" is the property and (state,action) is the function
        here we write the add todo logic to add the todo
    }, 
    removeTodo:(state,action)=>{  //same here.
        here we write the remove todo logic to remove the todo
     } 
    }

    remember to export the reducer at the end like this so that the store can use it :
export const {addTodo,removeTodo}=todoSlice.actions
export default todoSlice.reducer

* now create a components foder and a file it named AddTodo.jsx which has an form which further has an input and a button. to send data we use dispatch(), and to recieve data we use select()

