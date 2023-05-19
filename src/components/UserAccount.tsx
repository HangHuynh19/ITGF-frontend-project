import React, { useState } from 'react';
import PermIdentitySharpIcon from '@mui/icons-material/PermIdentitySharp';
import { Box, Menu, MenuItem, Typography } from '@mui/material';
import useAppDispatch from '../hooks/useAppDispatch';
import { Link } from 'react-router-dom';
import { logout } from '../store/reducers/authReducer';
import {clearCart} from '../store/reducers/cartReducer';

const UserAccount = () => {
  const dispatch = useAppDispatch();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    dispatch(clearCart());
    dispatch(logout());
  };

  return (
    <Box>
      <div id='header__user-account' onClick={handleOpenUserMenu}>
        <PermIdentitySharpIcon fontSize='small' />
        <span>
          <Typography id='header__user-account__greetings'>
            Hi, user!
          </Typography>
        </span>
      </div>
      <Menu
        id='user-menu'
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem component={Link} to='/profile'>
          <Typography textAlign='center'>Profile</Typography>
        </MenuItem>
        <MenuItem component={Link} to='/' onClick={handleLogout}>
          <Typography textAlign='center'>Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserAccount;
