// src/store/slices/uiSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarOpen: true,
  theme: 'light',
  notifications: [],
  loading: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    addNotification: (state, action) => {
      state.notifications.push(action.payload);
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  toggleSidebar,
  setTheme,
  addNotification,
  clearNotifications,
  setLoading,
} = uiSlice.actions;

export default uiSlice.reducer;