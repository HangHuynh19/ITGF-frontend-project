import axios, { AxiosError } from 'axios';
import { Product } from '../interfaces/Product';
import {
  getAllCategoriesQuery,
  getAllProductsQuery,
  getAllUsersQuery,
  getProductByIdQuery,
  getUserByAccessTokenQuery,
  loginQuery,
} from './queries';
import { User } from '../interfaces/User';

const baseURL = 'https://api.escuelajs.co/graphql';
const uploadImageURL = 'https://api.escuelajs.co/api/v1/files/upload';

const getAllCategories = async <T>(): Promise<T> => {
  try {
    const response = await axios.post(baseURL, {
      query: getAllCategoriesQuery,
    });
    //console.log('response from APICalls', response);
    return response.data.data.categories;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const e = error as AxiosError<T, any>;
      return e as T;
    } else {
      throw new Error((error as Error).message);
    }
  }
};

const getAllProducts = async <T>(): Promise<T> => {
  try {
    const response = await axios.post(baseURL, {
      query: getAllProductsQuery,
    });
    //console.log('response from APICalls', response);
    return response.data.data.products;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const e = error as AxiosError<T, any>;
      return e as T;
    } else {
      throw new Error((error as Error).message);
    }
  }
};

const getProductById = async <T>(id: number): Promise<T> => {
  console.log('id from APICalls', id);
  try {
    const response = await axios.post(baseURL, {
      query: getProductByIdQuery,
      variables: { id: id },
    });
    console.log('response from APICalls', response);
    return response.data.data.product;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const e = error as AxiosError<T, any>;
      return e as T;
    } else {
      throw new Error((error as Error).message);
    }
  }
};

const searchProductsByNameAndCategory = async <T>(
  searchTerm: string,
  categoryName: string
): Promise<T> => {
  try {
    const products = await getAllProducts<Product[]>();
    const filteredProducts = products.filter((product) => {
      if (categoryName === 'All categories')
        return product.title.toLowerCase().includes(searchTerm.toLowerCase());
      return (
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        product.category.name === categoryName
      );
    });
    console.log('apiCalls', filteredProducts);
    return filteredProducts as unknown as T;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const e = error as AxiosError<T, any>;
      return e as T;
    } else {
      throw new Error((error as Error).message);
    }
  }
};

const getAllUsers = async <T>(): Promise<T> => {
  try {
    const response = await axios.post(baseURL, {
      query: getAllUsersQuery,
    });
    //console.log('response from APICalls', response);
    return response.data.data.users;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const e = error as AxiosError<T, any>;
      return e as T;
    } else {
      throw new Error((error as Error).message);
    }
  }
};

const logingIn = async <T>(email: string, password: string): Promise<T> => {
  try {
    const response = await axios.post(baseURL, {
      query: loginQuery,
      variables: {
        email: email,
        password: password,
      },
    });
    console.log('response from loggingin APICalls', response);
    return response.data.data.login;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const e = error as AxiosError<T, any>;
      return e as T;
    } else {
      throw new Error((error as Error).message);
    }
  }
};

const getUserByAccessToken = async <T>(accessToken: string): Promise<T> => {
  try {
    const response = await axios.post<User>(
      baseURL,
      {
        query: getUserByAccessTokenQuery,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log('response from APICalls', response);
    return response.data as T;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const e = error as AxiosError<T, any>;
      return e as T;
    } else {
      throw new Error((error as Error).message);
    }
  }
};

const postImage = async (file: string) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    await axios.post(uploadImageURL, formData);
    console.log('Image upload succesfully from postImage APICalls');
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new AxiosError(error.message);
    } else {
      throw new Error((error as Error).message);
    }
  }
};

export {
  getAllCategories,
  getAllProducts,
  getProductById,
  searchProductsByNameAndCategory,
  getAllUsers,
  logingIn,
  getUserByAccessToken,
  postImage,
};
