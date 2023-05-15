import React from 'react';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import useAppSelector from '../hooks/useAppSelector';

const CartButton = () => {
  const totalPrice = useAppSelector((state) => state.cartReducer.totalPrice);

  return (
    <div id='header__cart'>
      <ShoppingCartOutlinedIcon fontSize='medium' />
      <span>€{totalPrice}</span>
    </div>
  );
};

export default CartButton;
