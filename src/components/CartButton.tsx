import React from 'react';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const CartButton = () => {
  return (
    <div id='header__cart'>
      <ShoppingCartOutlinedIcon />
      <span>€0.00</span>
    </div>
  );
};

export default CartButton;
