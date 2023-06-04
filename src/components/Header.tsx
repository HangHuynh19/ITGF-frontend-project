import React, { useContext, useEffect, useState } from 'react';
import { AppBar, Box, Button, Toolbar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import Search from './Search';
import CartButton from './CartButton';
import UserAccount from './UserAccount';
import useAppSelector from '../hooks/useAppSelector';
import LoginForm from './LoginForm';
import ProfileForm from './ProfileForm';
import { MainContext } from '../contexts/MainContext';

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector((state) => state.authReducer.isLoggedIn);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const { searchTerm, setSearchTerm } = useContext(MainContext);
  const { category, setCategory } = useContext(MainContext);
  const onLogoClick = () => {
    setSearchTerm('');
    setCategory('All categories');
    navigate('/');
  };
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
            {/* <Link to='/'> */}
            <img
              id='header__logo'
              src={require('../assets/logo.png')}
              alt='logo'
              onClick={onLogoClick}
            />
            {/* </Link> */}
          </Box>
          <Search />
          {isLoggedIn ? (
            <Box id='header__button-group'>
              <UserAccount />
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
              <ProfileForm
                formTitle='Register'
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
