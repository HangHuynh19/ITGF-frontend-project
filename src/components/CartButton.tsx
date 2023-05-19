import React from 'react';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import useAppSelector from '../hooks/useAppSelector';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const CartButton = () => {
  const user = useAppSelector((state) => state.userReducer.user);
  console.log('user in CartButton', user);
  const totalPrice = useAppSelector((state) => state.cartReducer.totalPrice);

  return (
    <Link to='/cart'>
      <Box id='header__cart'>
        <ShoppingCartOutlinedIcon fontSize='small' />
        <span>
          <Typography id='header__cart__total-amount'>€{totalPrice}</Typography>
        </span>
      </Box>
    </Link>
  );
};

export default CartButton;
