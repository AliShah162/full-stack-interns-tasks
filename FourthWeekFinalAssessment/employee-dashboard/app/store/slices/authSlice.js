import { createSlice } from "@reduxjs/toolkit";
import { json } from "zod/v4-mini";
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      //save to ls
      localStorage.setItem("user", JSON.stringify(action.payload));
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
    setloading: (state, action) => {
      state.loading = action.payload;
    },
  },
});
export const { login, logout, setloading } = authSlice.actions;
export default authSlice.reducer;