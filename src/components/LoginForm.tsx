import React, { useState } from 'react';
import {
  Box,
  Button,
  ButtonBase,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import RegisterForm from './RegisterForm';

const LoginForm = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box id='login-form' component='form'>
        <TextField id='login-form__email' label='Email' variant='outlined' />
        <TextField
          id='login-form__password'
          label='Password'
          variant='outlined'
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
          >
            Submit
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default LoginForm;
