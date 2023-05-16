import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../interfaces/User';
import { getAllUsers } from '../../graphql/apiCalls';

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

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async ({ email, password }: { email: string; password: string }) => {
    const respone = await getAllUsers<User[]>();
    const user = respone.find(
      (user) => user.email === email && user.password === password
    );
    if (!user) throw new Error('User not found');
    return user;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: intialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
      };
    },
    logout: (state) => {
      return {
        ...state,
        user: null,
        isLoggedIn: false,
      };
    },
  },
});

const userReducer = userSlice.reducer;
export const { login, logout } = userSlice.actions;

export default userReducer;
