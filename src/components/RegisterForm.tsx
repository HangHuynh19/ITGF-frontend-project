import { Box, Button, Modal, TextField } from '@mui/material';
import React from 'react';

const RegisterForm = ({
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
      <Box id='register-form' component='form'>
        <TextField id='register-form__name' label='Name' variant='outlined' />
        <TextField id='register-form__email' label='Email' variant='outlined' />
        <TextField id='register-form__password' label='Password' variant='outlined' />
        <TextField
          id='register-form__confirmPassword'
          label='Confirm Password'
          variant='outlined'
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
          >
            Submit
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default RegisterForm;
