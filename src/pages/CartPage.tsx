import React from 'react';
import Header from '../components/Header';
import useAppSelector from '../hooks/useAppSelector';
import CartItem from '../components/CartItem';

const CartPage = () => {
  const cartItems = useAppSelector((state) => state.cartReducer.cart);
  console.log('cartItems', cartItems);
  return (
    <>
      <Header />
      {cartItems &&
        cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
    </>
  );
};

export default CartPage;
