import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './reducers/cartReducer';
import userReducer from './reducers/userReducer';

const cartData = JSON.parse(localStorage.getItem('cart') || '[]');
const userData = JSON.parse(localStorage.getItem('user') || '{}');

const store = configureStore({
  reducer: {
    cartReducer: cartReducer,
    userReducer: userReducer,
  },
  preloadedState: {
    cartReducer: cartData,
    userReducer: userData,
  },
});

store.subscribe(() => {
  localStorage.setItem('cart', JSON.stringify(store.getState().cartReducer));
});

export type GlobalState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
