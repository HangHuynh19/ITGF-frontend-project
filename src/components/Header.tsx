import React from 'react';
import { ReactComponent as Logo } from '../assets/logo.svg';
import Search from './Search';
import { Divider } from '@mui/material';

const Header = () => {
  return (
    <>
      <header>
        <img id='logo' src={require('../assets/logo.png')} alt='logo' />
        <Search />
      </header>
      <Divider />
    </>
  );
};

export default Header;
