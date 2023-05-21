import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  deleteProduct,
  getAllProducts,
  getProductById,
  putProduct,
  searchProductsByNameAndCategory,
} from '../../graphql/apiCalls';
import CustomError from '../../classes/CustomError';
import { Product, ProductInput } from '../../interfaces/Product';

const initialState: {
  products: Product[];
  filteredProducts: Product[];
  loading: boolean;
  error: string | null;
} = {
  products: [],
  filteredProducts: [],
  loading: false,
  error: null,
};

export const fetchAllProducts = createAsyncThunk(
  'fetchAllProducts',
  async () => {
    try {
      const response = await getAllProducts();
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

export const fetchProductById = createAsyncThunk(
  'fetchProductById',
  async (id: number) => {
    try {
      const response = await getProductById(id);
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

export const filterProducts = createAsyncThunk(
  'filterProducts',
  async ({
    searchTerm,
    categoryName,
  }: {
    searchTerm: string;
    categoryName: string;
  }) => {
    try {
      const response = await searchProductsByNameAndCategory(
        searchTerm,
        categoryName
      );
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

export const updateProduct = createAsyncThunk(
  'updateProduct',
  async ({ id, product }: { id: number; product: ProductInput }) => {
    try {
      const response: Product = await putProduct(id, product);
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

export const removeProduct = createAsyncThunk(
  'removeProduct',
  async (id: number) => {
    try {
      const response: boolean = await deleteProduct(id);
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

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        if (action.payload instanceof CustomError) {
          state.error = action.payload.message;
          state.loading = false;
          return;
        }

        state.products = action.payload as Product[];
        state.loading = false;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.error = action.error.message || 'Cannot fetch products';
        state.loading = false;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        if (action.payload instanceof CustomError) {
          state.error = action.payload.message;
          state.loading = false;
          return;
        }

        state.filteredProducts = [action.payload as Product];
        state.loading = false;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.error = action.error.message || 'Cannot fetch product';
        state.loading = false;
      })
      .addCase(filterProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(filterProducts.fulfilled, (state, action) => {
        if (action.payload instanceof CustomError) {
          state.error = action.payload.message;
          state.loading = false;
          return;
        }

        state.filteredProducts = action.payload as Product[];
        state.loading = false;
      })
      .addCase(filterProducts.rejected, (state, action) => {
        state.error = action.error.message || 'Cannot fetch products';
        state.loading = false;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        if (action.payload instanceof CustomError) {
          state.error = action.payload.message;
          state.loading = false;
          return;
        }

        state.loading = false;
        state.products = state.products.map((product) => {
          if (product.id === (action.payload as Product).id) {
            return action.payload as Product;
          }

          return product;
        });
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.error = action.error.message || 'Cannot update product';
        state.loading = false;
      })
      .addCase(removeProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        if (action.payload instanceof CustomError) {
          state.error = action.payload.message;
          state.loading = false;
          return;
        }

        state.loading = false;
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
      })
      .addCase(removeProduct.rejected, (state, action) => {
        state.error = action.error.message || 'Cannot remove product';
        state.loading = false;
      });
  },
});

const productReducer = productSlice.reducer;

export default productReducer;
