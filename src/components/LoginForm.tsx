import React, { useState } from 'react';
import { Box, Button, Modal, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import useInputHook from '../hooks/useInputHook';
import useAppDispatch from '../hooks/useAppDispatch';
import { fetchUserByAccessToken } from '../store/reducers/userReducer';
import { authenticate } from '../store/reducers/authReducer';

const LoginForm = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const dispatch = useAppDispatch();
  const email = useInputHook('');
  const password = useInputHook('');
  const handleCancel = () => {
    onClose();
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(
      authenticate({ email: email.value, password: password.value })
    );
    await dispatch(fetchUserByAccessToken());
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box id='login-form' component='form' onSubmit={handleSubmit}>
        <TextField
          id='login-form__email'
          label='Email'
          type='email'
          variant='outlined'
          color='secondary'
          required
          onChange={email.onChange}
        />
        <TextField
          id='login-form__password'
          label='Password'
          type='password'
          variant='outlined'
          color='secondary'
          required
          onChange={password.onChange}
        />
        <div id='login-form__btnGroup'>
          <Button
            id='login-form__cancelBtn'
            variant='contained'
            color='secondary'
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            id='login-form__submitBtn'
            variant='contained'
            color='primary'
            type='submit'
          >
            Submit
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default LoginForm;
