import React, { useState } from 'react';
import PermIdentitySharpIcon from '@mui/icons-material/PermIdentitySharp';
import { Box, Menu, MenuItem, Typography } from '@mui/material';
import useAppDispatch from '../hooks/useAppDispatch';
import { Link } from 'react-router-dom';
import useAppSelector from '../hooks/useAppSelector';
import { log } from 'console';

const settings = ['Profile', 'Logout'];

const UserAccount = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userReducer);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    dispatch({ type: 'user/logout' });
    console.log('token in localStorage', localStorage.getItem('token'));
    console.log('user in localStorage', localStorage.getItem('user'));
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
        {/* {settings.map((setting, index) => (
          <MenuItem key={setting} onClick={actions[index]}>
            <Typography textAlign='center'>{setting}</Typography>
          </MenuItem>
        ))} */}
        <MenuItem>
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
