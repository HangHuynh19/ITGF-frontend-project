import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './reducers/cartReducer';
import userReducer from './reducers/userReducer';
import authReducer from './reducers/authReducer';
import productReducer from './reducers/productReducer';
import categoryReducer from './reducers/categoryReducer';

const cartData = JSON.parse(localStorage.getItem('cart') || '[]');

const store = configureStore({
  reducer: {
    cartReducer: cartReducer,
    userReducer: userReducer,
    authReducer: authReducer,
    productReducer: productReducer,
    categoryReducer: categoryReducer,
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
