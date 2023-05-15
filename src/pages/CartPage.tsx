import React from 'react';
import Header from '../components/Header';
import useAppSelector from '../hooks/useAppSelector';
import CartItem from '../components/CartItem';
import { Typography } from '@mui/material';

const CartPage = () => {
  const cartItems = useAppSelector((state) => state.cartReducer);
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
        cartItems.cart.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
    </>
  );
};

export default CartPage;
