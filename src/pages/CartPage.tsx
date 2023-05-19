import React, { useState } from 'react';
import Header from '../components/Header';
import useAppSelector from '../hooks/useAppSelector';
import CartItem from '../components/CartItem';
import { Typography } from '@mui/material';
import { Product } from '../interfaces/Product';

const CartPage = () => {
  const user = useAppSelector((state) => state.userReducer.user);
  console.log('user in CartPage', user);
  const cartItems = useAppSelector(
    (state) => state.cartReducer
  );
  //console.log('cartItems', cartItems);

  return (
    <>
      <Header />
      <div id='cart'>
        <Typography id='cart__header' variant='h5' component='h2'>
          Cart ({cartItems.totalQuantity})
        </Typography>
        <Typography id='cart__sub-header' variant='body2' component='sub'>
          <b>TOTAL:</b> €{cartItems.totalPrice}
        </Typography>
      </div>
      {cartItems &&
        cartItems.cart.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
    </>
  );
};

export default CartPage;
