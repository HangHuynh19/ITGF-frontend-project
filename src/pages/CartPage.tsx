import React from 'react';
import Header from '../components/Header';
import useAppSelector from '../hooks/useAppSelector';

const CartPage = () => {
  const cartItems = useAppSelector((state) => state.cartReducer.cart);
  console.log('cartItems', cartItems);
  return (
    <>
      <Header />
      {cartItems &&
        cartItems.map((item) => (
          <div key={item.id}>
            <p>{item.title}</p>
            <p>{item.quantity}</p>
          </div>
        ))}
    </>
  );
};

export default CartPage;
