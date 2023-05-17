import React from 'react';
import PermIdentitySharpIcon from '@mui/icons-material/PermIdentitySharp';
import {
  Box,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';

const settings = ['Profile', 'Logout'];

const UserAccount = () => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
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
        {settings.map((setting) => (
          <MenuItem key={setting} onClick={handleCloseUserMenu}>
            <Typography textAlign='center'>{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default UserAccount;
