import React from 'react';
import Search from './Search';
import { Divider } from '@mui/material';
import UserAccount from './UserAccount';
import CartButton from './CartButton';
import { Link } from 'react-router-dom';
import { Product } from '../interfaces/Product';

const Header = () => {

  return (
    <>
      <header>
        <Link to='/'>
          <img id='logo' src={require('../assets/logo.png')} alt='logo' />
        </Link>
        <Search />
        <UserAccount />
        <Link to='/cart'>
          <CartButton />
        </Link>
      </header>
      <Divider />
    </>
  );
};

export default Header;
