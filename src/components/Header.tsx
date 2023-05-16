import React from 'react';
import Search from './Search';
import { AppBar, Box, Divider, Toolbar } from '@mui/material';
import UserAccount from './UserAccount';
import CartButton from './CartButton';
import { Link } from 'react-router-dom';
import { Product } from '../interfaces/Product';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const Header = () => {
  return (
    <>
      <AppBar position='static' color='transparent'>
        <Toolbar id='header'>
          <Box>
            <Link to='/'>
              <img
                id='header__logo'
                src={require('../assets/logo.png')}
                alt='logo'
              />
            </Link>
          </Box>
          <Search />
          <Box id='header__button-group'>
            <UserAccount />
            <FavoriteBorderIcon fontSize='small' />
            <CartButton />
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
