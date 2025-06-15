import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from './types';

const initialState: CartItem[] = JSON.parse(sessionStorage.getItem('cart') || '[]');

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const existing = state.find(item => item.id === action.payload.id);
      if (existing) {
        existing.count += 1;
      } else {
        state.push({ ...action.payload, count: 1 });
      }
      sessionStorage.setItem('cart', JSON.stringify(state));
    },
    removeFromCart(state, action: PayloadAction<number>) {
      const index = state.findIndex(item => item.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
      sessionStorage.setItem('cart', JSON.stringify(state));
    },
    clearCart() {
      sessionStorage.removeItem('cart');
      return [];
    }
  }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;