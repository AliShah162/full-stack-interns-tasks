import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./features/todo/todoSlice";  // Default import hai

export const store = configureStore({
  reducer: {
    todo: todoReducer  //this is just a random varibale name we choose to import todoSlice
  }
});