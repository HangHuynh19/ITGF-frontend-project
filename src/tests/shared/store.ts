import { configureStore } from '@reduxjs/toolkit';

import cartReducer from '../../store/reducers/cartReducer';
import authReducer from '../../store/reducers/authReducer';
import userReducer from '../../store/reducers/userReducer';
import productReducer from '../../store/reducers/productReducer';
import categoryReducer from '../../store/reducers/categoryReducer';

const store = configureStore({
  reducer: {
    cartReducer: cartReducer,
    userReducer: userReducer,
    authReducer: authReducer,
    productReducer: productReducer,
    categoryReducer: categoryReducer,
  },
});

export default store;
