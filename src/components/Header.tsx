import React, { useEffect, useState } from 'react';
import { AppBar, Box, Button, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';

import Search from './Search';
import CartButton from './CartButton';
import UserAccount from './UserAccount';
import useAppSelector from '../hooks/useAppSelector';
import LoginForm from './LoginForm';
import { fetchUserByAccessToken } from '../store/reducers/userReducer';
import useAppDispatch from '../hooks/useAppDispatch';
import ProfileForm from './ProfileForm';

const Header = () => {
  const isLoggedIn = useAppSelector((state) => state.authReducer.isLoggedIn);
  const dispatch = useAppDispatch();
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

  /* useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchUserByAccessToken());
    }
  }, [dispatch, isLoggedIn]); */

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
