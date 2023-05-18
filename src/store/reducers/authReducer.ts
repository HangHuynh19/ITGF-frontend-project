//Auth reducer is used to validate whether user is authenticated or not. 
//Auth reducer is also used to manage user login and logout

import {  PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { logIn } from '../../graphql/apiCalls';

interface AuthState {
  isAuthenticated: boolean,
}

//initial state is set based on whether user has token in local storage or not
//if yes => authenticated
//if no => unauthenticated
const createInitialState = (): AuthState => {
  const token = localStorage.getItem('token');
  return {
    isAuthenticated: token ? true : false,
  }
}

const createExtraActions = () => {
  //login: call api -> success -> set auth status, save token to local storage
  const login = () => {
    return createAsyncThunk(
      'login',
      async ({ email, password }: { email: string; password: string }, { dispatch }) => {
        try {
          const response: { data: { data: { login: { access_token : string }}} } = await logIn(
            email,
            password
          );
          dispatch(authActions.setAuth(true))
          localStorage.setItem('token', response.data.data.login.access_token);
        } catch (err) {
          //show error
          console.log(err)
        }
      }
    );
  }

  //logout: set unauth status, delete everything from local storage
  const logout = () => {
    return createAsyncThunk(
      'logout', (arg, { dispatch }) => {
        dispatch(authActions.setAuth(false))
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    )
  }

  return { login: login(), logout: logout() }
}

const authSlice = createSlice({
  name: 'auth',
  initialState: createInitialState(),
  reducers: { 
    setAuth(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload
    }
  },
});

const extraActions = createExtraActions();
const authReducer = authSlice.reducer;

export const authActions = { ...authSlice.actions, ...extraActions };
export default authReducer;
