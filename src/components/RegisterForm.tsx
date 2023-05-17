import React from 'react';
import { Box, Button, Input, Modal, TextField } from '@mui/material';
import useInputHook from '../hooks/useInputHook';

const RegisterForm = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const name = useInputHook('');
  const email = useInputHook('');
  const password = useInputHook('');
  const confirmPassword = useInputHook('');
  const avatar = useInputHook('');
  const handleCancel = () => {
    onClose();
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submit', {
      name: name.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
      avatar: avatar.value,
    });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box id='register-form' component='form' onSubmit={handleSubmit}>
        <TextField
          id='register-form__name'
          label='Name'
          variant='outlined'
          onChange={name.onChange}
        />
        <TextField
          id='register-form__email'
          label='Email'
          type='email'
          variant='outlined'
          onChange={email.onChange}
        />
        <TextField
          id='register-form__password'
          label='Password'
          type='password'
          variant='outlined'
          onChange={password.onChange}
        />
        <TextField
          id='register-form__confirmPassword'
          label='Confirm Password'
          type='password'
          variant='outlined'
          onChange={confirmPassword.onChange}
        />
        <Input
          id='register-form__avatar'
          type='file'
          disableUnderline={true}
          inputProps={{ accept: 'image/*' }}
          onChange={avatar.onChange}
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
