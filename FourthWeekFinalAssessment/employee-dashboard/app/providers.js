'use client';
import { Provider } from 'react-redux';
import { store } from './store';  // ← Make sure this path is correct

export function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}