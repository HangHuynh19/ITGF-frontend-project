import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ProductWithQuantity } from '../../interfaces/Product';

const initalState: {
  cart: ProductWithQuantity[];
  loading: boolean;
  error: string | null;
} = {
  cart: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initalState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductWithQuantity>) => {
      const newItem = action.payload;
      if (state.cart.length === 0) {
        state.cart.push(newItem);
        return;
      }
      const existingItem = state.cart.find((item) => item.id === newItem.id);
      if (!existingItem) {
        state.cart.push(newItem);
      } else {
        existingItem.quantity += 1;
      }
    },
    removeFromCart: (state, action: PayloadAction<ProductWithQuantity>) => {
      const index = state.cart.findIndex((item) => item.id === action.payload.id);
      if (index >= 0) {
        state.cart[index].quantity -= 1;
        if (state.cart[index].quantity === 0) {
          state.cart.splice(index, 1);
        }
      }
    },
  },
});

const cartReducer = cartSlice.reducer;
export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartReducer;
