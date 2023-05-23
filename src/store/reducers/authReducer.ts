import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { logingIn } from '../../graphql/apiCalls';
import { AxiosError } from 'axios';
import CustomError from '../../classes/CustomError';

const token = localStorage.getItem('token');
const initialState: {
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
} = {
  isLoggedIn: token ? true : false,
  isLoading: false,
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

      if (!response.access_token) {
        return new CustomError('Unauthorized');
      }

      localStorage.setItem('token', response.access_token);
    } catch (err) {
      if (err instanceof AxiosError) {
        return new CustomError(err.response?.data.message);
      } else {
        return err;
      }
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /* setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    }, */
    logout: (state) => {
      localStorage.removeItem('token');
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticate.fulfilled, (state, action) => {
        if (action.payload instanceof Error) {
          state.error = action.payload.message;
          state.isLoggedIn = false;
          state.isLoading = false;
          return;
        }
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(authenticate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authenticate.rejected, (state, action) => {
        state.error = action.error.message || 'Cannot login';
        state.isLoading = false;
      });
  },
});

const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;

export default authReducer;
