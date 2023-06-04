import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Modal,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';

import useInputHook from '../hooks/useInputHook';
import useAppDispatch from '../hooks/useAppDispatch';
import { fetchUserByAccessToken } from '../store/reducers/userReducer';
import { authenticate } from '../store/reducers/authReducer';
import useAppSelector from '../hooks/useAppSelector';

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
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const handleCancel = () => {
    email.reset();
    password.reset();
    onClose();
  };
  const auth = useAppSelector((state) => state.authReducer);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(
      authenticate({ email: email.value, password: password.value })
    );
    await dispatch(fetchUserByAccessToken());
    onClose();
  };
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    if (auth.error !== null) {
      setSnackbarMessage('Incorrect email or password');
      setOpenSnackbar(true);
    } else if (auth.isLoggedIn) {
      setSnackbarMessage('Login successfully');
      setOpenSnackbar(true);
    }
  }, [auth.error, auth.isLoggedIn, dispatch]);

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box id='login-form' component='form' onSubmit={handleSubmit}>
          <Typography id='login-form__form-title' variant='h5'>
            Login
          </Typography>
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
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        /* action={action} */
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
    </>
  );
};

export default LoginForm;
