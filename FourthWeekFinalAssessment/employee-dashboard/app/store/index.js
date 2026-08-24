import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import employeeReducer from './slices/employeeSlice';
import uiReducer from './slices/uiSlice';
import { employeeApi } from './api/employeeApi';

export const store = configureStore({  
  reducer: {
    auth: authReducer,
    employee: employeeReducer,
    ui: uiReducer,
    [employeeApi.reducerPath]: employeeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(employeeApi.middleware),
});