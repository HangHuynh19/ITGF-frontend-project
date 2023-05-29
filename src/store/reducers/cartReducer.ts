import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Product, ProductWithQuantity } from '../../interfaces/Product';

const initialState: {
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
  initialState: initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const newItem = action.payload;
      const existingItem =
        state.cart.find((item) => item.id === newItem.id) || null;
      if (!existingItem) {
        state.cart.push({ ...newItem, quantity: 1 });
      } else {
        existingItem.quantity += 1;
      }
      state.totalQuantity++;
      state.totalPrice += newItem.price;
      localStorage.setItem('cart', JSON.stringify(state.cart));
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
      existingItem.quantity -= 1;
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    updateCartWhenProductUpdated: (
      state,
      action: PayloadAction<{ id: number; product: Product }>
    ) => {
      const { id, product } = action.payload;
      const existingItemIndex = state.cart.findIndex((item) => item.id === id);

      if (existingItemIndex === -1) {
        state.error = 'Item not found in cart';
        return;
      }

      const updatedCart = [...state.cart];

      updatedCart[existingItemIndex] = {
        ...updatedCart[existingItemIndex],
        ...product,
      };

      const totalPrice = updatedCart.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);

      state.cart = updatedCart;
      state.totalPrice = totalPrice;
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    updateCartWhenProductDeleted: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const existingItem = state.cart.find((item) => item.id === id);

      if (!existingItem) {
        state.error = 'Item not found in cart';
        return;
      }

      const updatedCart = state.cart.filter((item) => item.id !== id);

      state.cart = updatedCart;
      state.totalQuantity -= existingItem.quantity;
      state.totalPrice -= existingItem.price * existingItem.quantity;
      localStorage.setItem('cart', JSON.stringify(state.cart));
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
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    clearCart: (state) => {
      return initialState;
    },
  },
});

const cartReducer = cartSlice.reducer;
export const {
  addToCart,
  reduceQuantity,
  updateCartWhenProductUpdated,
  updateCartWhenProductDeleted,
  deleteFromCart,
  clearCart,
} = cartSlice.actions;

export default cartReducer;
