import { Box, TextField } from '@mui/material';
import React from 'react';

const RegisterForm = () => {
  return (
    <Box component='form'>
      <TextField id='name' label='Name' variant='outlined' />
      <TextField id='email' label='Email' variant='outlined' />
      <TextField id='password' label='Password' variant='outlined' />
      <TextField
        id='confirmPassword'
        label='Confirm Password'
        variant='outlined'
      />
    </Box>
  );
};

export default RegisterForm;
