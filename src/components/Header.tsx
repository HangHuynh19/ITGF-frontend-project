import React, { useState } from 'react';
import { AppBar, Box, Button, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import Search from './Search';
import CartButton from './CartButton';
import UserAccount from './UserAccount';
import useAppSelector from '../hooks/useAppSelector';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const Header = () => {
  const isLoggedIn = useAppSelector((state) => state.authReducer.isLoggedIn);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const handleOpenLoginModal = () => {
    setIsLoginModalOpen(true);
  };
  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };
  const handleOpenRegisterModal = () => {
    setIsRegisterModalOpen(true);
  };
  const handleCloseRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

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
          {isLoggedIn ? (
            <Box id='header__button-group'>
              <UserAccount />
              <FavoriteBorderIcon fontSize='small' />
              <CartButton />
            </Box>
          ) : (
            <Box>
              <Button
                variant='text'
                color='secondary'
                onClick={handleOpenLoginModal}
              >
                Login
              </Button>
              <LoginForm
                open={isLoginModalOpen}
                onClose={handleCloseLoginModal}
              />
              <Button
                variant='text'
                color='secondary'
                onClick={handleOpenRegisterModal}
              >
                Register
              </Button>
              <RegisterForm
                open={isRegisterModalOpen}
                onClose={handleCloseRegisterModal}
              />
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
