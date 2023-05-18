import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Product, ProductWithQuantity } from '../../interfaces/Product';

const initalState: {
  cart: ProductWithQuantity[];
  totalQuantity: number;
  totalPrice: number;
  loading: boolean;
  error: string | null;
} = {
  cart: [],
  totalQuantity: 0,
  totalPrice: 0,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initalState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const newItem = action.payload;
      const existingItem = state.cart.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.totalPrice += newItem.price;

      if (!existingItem) {
        state.cart.push({ ...newItem, quantity: 1 });
        return;
      }
      console.log('existingItem', state.totalQuantity);
      existingItem.quantity += 1;
    },
    reduceQuantity: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const existingItem = state.cart.find((item) => item.id === id);

      if (!existingItem) {
        state.error = 'Item not found in cart';
        return;
      }

      state.totalQuantity--;
      state.totalPrice -= existingItem.price;

      if (existingItem.quantity === 1) {
        state.cart = state.cart.filter((item) => item.id !== id);
        return;
      }
      console.log('existingItem', existingItem.quantity);
      existingItem.quantity -= 1;
    },
    deleteFromCart: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const existingItem = state.cart.find((item) => item.id === id);

      if (!existingItem) {
        state.error = 'Item not found in cart';
        return;
      }

      state.totalQuantity -= existingItem.quantity;
      state.totalPrice -= existingItem.price * existingItem.quantity;
      state.cart = state.cart.filter((item) => item.id !== id);
    },
  },
});

const cartReducer = cartSlice.reducer;
export const { addToCart, reduceQuantity, deleteFromCart } = cartSlice.actions;

export default cartReducer;