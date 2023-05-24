import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Input,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import useInputHook from '../hooks/useInputHook';
import useAppDispatch from '../hooks/useAppDispatch';
import { createUser } from '../store/reducers/userReducer';
import { authenticate } from '../store/reducers/authReducer';

const RegisterForm = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const dispatch = useAppDispatch();
  const name = useInputHook('');
  const email = useInputHook('');
  const password = useInputHook('');
  const confirmedPassword = useInputHook('');
  const [passwordError, setPasswordError] = useState('');
  const [avatar, setAvatar] = useState<File | null>(null);

  const handleCancel = () => {
    name.reset();
    email.reset();
    password.reset();
    confirmedPassword.reset();
    setAvatar(null);
    setPasswordError('');
    onClose();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAvatar(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await dispatch(
        createUser({
          name: name.value,
          email: email.value,
          password: password.value,
          avatar: avatar === null ? '' : avatar,
        })
      );

      await dispatch(
        authenticate({ email: email.value, password: password.value })
      );
    } catch (err) {
      console.log(err);
    }
  
    onClose();
  };

  const handleConfirmedPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    confirmedPassword.onChange(e);
    if (password.value !== e.target.value) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('');
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box id='register-form' component='form' onSubmit={handleSubmit}>
        <Typography id='register-form__form-title' variant='h5'>
          Register
        </Typography>
        <TextField
          id='register-form__name'
          label='Name'
          variant='outlined'
          color='secondary'
          onChange={name.onChange}
        />
        <TextField
          id='register-form__email'
          label='Email'
          type='email'
          variant='outlined'
          color='secondary'
          onChange={email.onChange}
        />
        <TextField
          id='register-form__password'
          label='Password'
          type='password'
          variant='outlined'
          color='secondary'
          onChange={password.onChange}
        />
        <TextField
          id='register-form__confirmPassword'
          label='Confirm Password'
          type='password'
          variant='outlined'
          color='secondary'
          error={!!passwordError}
          helperText={passwordError ? `${passwordError}` : ''}
          onChange={handleConfirmedPasswordChange}
        />
        <Input
          id='register-form__avatar'
          type='file'
          disableUnderline={true}
          inputProps={{ accept: 'image/*' }}
          onChange={handleAvatarChange}
        />
        <div id='register-form__btnGroup'>
          <Button
            id='register-form__cancelBtn'
            variant='contained'
            color='secondary'
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            id='register-form__submitBtn'
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

export default RegisterForm;
