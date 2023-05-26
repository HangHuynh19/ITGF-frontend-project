import React from 'react';
import {
  Box,
  Button,
  Input,
  Modal,
  TextField,
  Typography,
} from '@mui/material';

import useAppDispatch from '../hooks/useAppDispatch';
import useAppSelector from '../hooks/useAppSelector';
import useInputHook from '../hooks/useInputHook';
import { createUser, updateUser } from '../store/reducers/userReducer';
import { authenticate } from '../store/reducers/authReducer';
import { UpdateUser } from '../interfaces/User';

const ProfileForm = ({
  formTitle,
  open,
  onClose,
}: {
  formTitle: string;
  open: boolean;
  onClose: () => void;
}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userReducer.user);
  const name = useInputHook(user ? (user.name as string) : '');
  const email = useInputHook(user ? (user.email as string) : '');
  const password = useInputHook('');
  const confirmedPassword = useInputHook('');
  const [passwordError, setPasswordError] = React.useState('');
  const [avatar, setAvatar] = React.useState<File | null>(null);
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

    if (formTitle === 'Register') {
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
    }

    if (formTitle === 'Edit Profile') {
      const userInput = {
        name: name.value,
        email: email.value,
        password: password.value,
        avatar: avatar,
      };

      const updateObj: UpdateUser = Object.entries(userInput)
        .filter(([key, value]) => Boolean(value))
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

      dispatch(
        updateUser({
          id: user?.id as number,
          user: updateObj,
        })
      );
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
      <Box id='profile-form' component='form' onSubmit={handleSubmit}>
        <Typography id='profile-form__form-title' variant='h5'>
          {formTitle}
        </Typography>
        <TextField
          id='profile-form__name'
          label='Name'
          variant='outlined'
          color='secondary'
          required={formTitle === 'Register'}
          onChange={name.onChange}
        />
        <TextField
          id='profile-form__email'
          label='Email'
          type='email'
          variant='outlined'
          color='secondary'
          required={formTitle === 'Register'}
          onChange={email.onChange}
        />
        <TextField
          id='profile-form__password'
          label='Password'
          type='password'
          variant='outlined'
          color='secondary'
          required={formTitle === 'Register'}
          onChange={password.onChange}
        />
        <TextField
          id='profile-form__confirmPassword'
          label='Confirm Password'
          type='password'
          variant='outlined'
          color='secondary'
          required={formTitle === 'Register'}
          error={!!passwordError}
          helperText={passwordError ? `${passwordError}` : ''}
          onChange={handleConfirmedPasswordChange}
        />
        <Input
          id='profile-form__avatar'
          type='file'
          disableUnderline={true}
          required={formTitle === 'Register'}
          inputProps={{ accept: 'image/*' }}
          onChange={handleAvatarChange}
        />
        <div id='profile-form__btnGroup'>
          <Button
            id='profile-form__cancelBtn'
            variant='contained'
            color='secondary'
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            id='profile-form__submitBtn'
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

export default ProfileForm;
