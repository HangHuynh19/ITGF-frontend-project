import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Category } from '../../interfaces/Category';
import { getAllCategories } from '../../graphql/apiCalls';
import CustomError from '../../classes/CustomError';

const initialState: {
  categories: Category[];
  loading: boolean;
  error: string | null;
} = {
  categories: [],
  loading: false,
  error: null,
};

export const fetchAllCategories = createAsyncThunk(
  'fetchAllCategories',
  async () => {
    try {
      const response = await getAllCategories();
      return response;
    } catch (err) {
      if (err instanceof CustomError) {
        return new CustomError(err.message);
      } else {
        return err;
      }
    }
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        if (action.payload instanceof CustomError) {
          state.error = action.payload.message;
          state.loading = false;
          return;
        }

        state.categories = action.payload as Category[];
        state.loading = false;
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.error = action.error.message || 'Cannot fetch categories';
        state.loading = false;
      });
  },
});

const categoryReducer = categorySlice.reducer;

export default categoryReducer;
