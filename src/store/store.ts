import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './reducers/cartReducer';
import userReducer from './reducers/userReducer';
import authReducer from './reducers/authReducer';

const cartData = JSON.parse(localStorage.getItem('cart') || '[]');

const store = configureStore({
  reducer: {
    cartReducer: cartReducer,
    userReducer: userReducer,
    authReducer: authReducer,
  },
  preloadedState: {
    cartReducer: cartData,
  },
});

store.subscribe(() => {
  localStorage.setItem('cart', JSON.stringify(store.getState().cartReducer));
});

export type GlobalState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
