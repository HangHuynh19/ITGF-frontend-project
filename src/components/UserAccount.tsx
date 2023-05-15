import React from 'react';
import PermIdentitySharpIcon from '@mui/icons-material/PermIdentitySharp';

const UserAccount = () => {
  return (
    <div id='header__user-account'>
      <PermIdentitySharpIcon fontSize='medium' />
      <span>Hi, user!</span>
    </div>
  );
};

export default UserAccount;
