import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UpdateUser, User } from '../../interfaces/User';
import {
  getUserByAccessToken,
  postUser,
  putUser,
} from '../../graphql/apiCalls';
import CustomError from '../../classes/CustomError';
import { AxiosError } from 'axios';

const intialState: {
  user: User | null;
  loading: boolean;
  error: string | null;
} = {
  user: null,
  loading: false,
  error: null,
};

export const fetchUserByAccessToken = createAsyncThunk(
  'fetchUserByAccessToken',
  async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return new CustomError('Unauthorized');
      }

      const response: User = await getUserByAccessToken(token);
      if (!response) {
        return new CustomError('User not found');
      }

      return response;
    } catch (err) {
      if (err instanceof AxiosError) {
        return new CustomError(err.response?.data.message);
      } else {
        return err;
      }
    }
  }
);

export const createUser = createAsyncThunk('createUser', async (user: User) => {
  try {
    const response = await postUser(user);
    //console.log('user in redux store', response);
    return response;
  } catch (err) {
    if (err instanceof AxiosError) {
      return new CustomError(err.response?.data.message);
    } else {
      return err;
    }
  }
});

export const updateUser = createAsyncThunk(
  'updateUser',
  async ({ id, user }: { id: number; user: UpdateUser }) => {
    try {
      const response = await putUser(id, user);
      console.log('user in redux store', response);
      return response;
    } catch (err) {
      if (err instanceof AxiosError) {
        return new CustomError(err.response?.data.message);
      } else {
        return err;
      }
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: intialState,
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(fetchUserByAccessToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserByAccessToken.rejected, (state, action) => {
        state.error = action.error.message || 'Cannot fetch user';
        state.loading = false;
      })
      .addCase(fetchUserByAccessToken.fulfilled, (state, action) => {
        if (action.payload instanceof Error) {
          state.error = action.payload.message;
          state.loading = false;
          return;
        }

        if (action.payload === null) {
          state.loading = false;
          return;
        }

        state.user = action.payload as User;
        state.loading = false;
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.error = action.error.message || 'Cannot create user';
        state.loading = false;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        if (action.payload instanceof Error) {
          state.error = action.payload.message;
          state.loading = false;
          return;
        }
        state.loading = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error.message || 'Cannot update user';
        state.loading = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        if (action.payload instanceof Error) {
          state.error = action.payload.message;
          state.loading = false;
          return;
        }
        state.loading = false;
        state.user = action.payload as User;
      });
  },
});

const userReducer = userSlice.reducer;
//export const { login, logout } = userSlice.actions;

export default userReducer;
