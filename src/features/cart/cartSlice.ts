import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  count: number;
}

const initialState: CartItem[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = state.find(i => i.id === action.payload.id);
      if (item) {
        item.count += action.payload.count;
      } else {
        state.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      return state.filter(item => item.id !== action.payload);
    },
    clearCart: () => [],
    loadSavedCart: (state, action: PayloadAction<CartItem[]>) => {
      return action.payload;
    },
  },
});

export const { addToCart, removeFromCart, clearCart, loadSavedCart } = cartSlice.actions;
export default cartSlice.reducer;