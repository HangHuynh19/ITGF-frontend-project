import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../interfaces/User';
import {
  getUserByAccessToken,
  logingIn,
  postUser,
} from '../../graphql/apiCalls';

const intialState: {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
} = {
  user: null,
  isLoggedIn: false,
  loading: false,
  error: null,
};

export const authenticate = createAsyncThunk(
  'authenticate',
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const response: { access_token: string } = await logingIn(
        email,
        password
      );
      localStorage.setItem('token', response.access_token);
      return response.access_token;
    } catch (err) {
      return err;
    }
  }
);

export const fetchUserByAccessToken = createAsyncThunk(
  'fetchUserByAccessToken',
  async (accessToken: string) => {
    try {
      const response: User = await getUserByAccessToken(accessToken);
      console.log('user in redux store', response);
      localStorage.setItem('user', JSON.stringify(response));
      return response;
    } catch (err) {
      return err;
    }
  }
);

export const createUser = createAsyncThunk('createUser', async (user: User) => {
  try {
    const response = await postUser(user);
    //console.log('user in redux store', response);
    return response;
  } catch (err) {
    return err;
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: intialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(authenticate.pending, (state) => {
        state.loading = true;
      })
      .addCase(authenticate.rejected, (state, action) => {
        state.error = action.error.message || 'Cannot login';
        state.loading = false;
      })
      .addCase(authenticate.fulfilled, (state, action) => {
        if (action.payload instanceof Error) {
          state.error = action.payload.message;
          state.loading = false;
          return;
        }
        state.isLoggedIn = true;
        state.loading = false;
      })
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
          state.isLoggedIn = false;
          state.loading = false;
          return;
        }

        state.user = action.payload as User;
        state.isLoggedIn = true;
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
      });
  },
});

const userReducer = userSlice.reducer;
//export const { login, logout } = userSlice.actions;

export default userReducer;
