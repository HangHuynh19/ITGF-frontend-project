import React, { useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

import ProfileForm from '../components/ProfileForm';
import useAppSelector from '../hooks/useAppSelector';
import useAppDispatch from '../hooks/useAppDispatch';
import { fetchUserByAccessToken } from '../store/reducers/userReducer';

const ProfilePage = () => {
  const user = useAppSelector((state) => state.userReducer.user);
  const dispatch = useAppDispatch();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  useEffect(() => {
    const fetchUser = async () => {
      await dispatch(fetchUserByAccessToken());
    };
    fetchUser();
  }, [dispatch]);

  return (
    <>
      {user ? (
        <div id='profile'>
          <div id='profile__avatar-container'>
            <img
              id='profile__avatar-container__img'
              src={user.avatar as string}
              alt='avatar'
            />
          </div>
          <article id='profile__user-info'>
            <Typography id='profile__user-info__name' component='h1'>
              Hi, {user.name}!
            </Typography>
            <Typography id='profile__user-info__email' component='p'>
              <MailOutlineIcon fontSize='small' />
              <span> {user.email} </span>
            </Typography>
            <Button
              variant='contained'
              color='secondary'
              onClick={handleOpenEditModal}
            >
              Edit profile
            </Button>
            <ProfileForm
              formTitle='Edit Profile'
              open={isEditModalOpen}
              onClose={handleCloseEditModal}
            />
          </article>
        </div>
      ) : (
        <Typography component='p'>User not found</Typography>
      )}
    </>
  );
};

export default ProfilePage;
