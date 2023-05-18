import {fetchUserByAccessToken} from './../store/reducers/userReducer';
import axios, { AxiosError } from 'axios';
import { Product } from '../interfaces/Product';
import {
  getAllCategoriesQuery,
  getAllProductsQuery,
  getAllUsersQuery,
  getProductByIdQuery,
  getUserByAccessTokenQuery,
  loginQuery,
  postUserQuery,
} from './queries';
import { User } from '../interfaces/User';
import { ImageResponse } from '../interfaces/ServerResponses';
import CustomError from '../classes/CustomError';

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
    if (error instanceof CustomError) {
      throw error;
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
    if (error instanceof CustomError) {
      throw error;
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
    if (error instanceof CustomError) {
      throw error;
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
    if (error instanceof CustomError) {
      throw error;
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
    if (error instanceof CustomError) {
      throw error;
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
    console.log(
      'response from loggingin APICalls',
      response.data.data.login.access_token
    );
    return response.data.data.login;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    } else {
      throw new Error((error as Error).message);
    }
  }
};

//Giang xink comment
/* No need to try catch here. Let it function simply as an api call. We will
/catch error in reducer */
const logIn = async <T>(email: string, password: string): Promise<T> => {
  return await axios.post(baseURL, {
    query: loginQuery,
    variables: {
      email: email,
      password: password,
    },
  })
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
    if (error instanceof CustomError) {
      throw error;
    } else {
      throw new Error((error as Error).message);
    }
  }
};

const postImage = async (file: File): Promise<ImageResponse> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const imageUrl = await axios.post<ImageResponse>(uploadImageURL, formData);
    //console.log('Image upload succesfully from postImage APICalls', imageUrl);
    return imageUrl.data;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    } else {
      throw new Error((error as Error).message);
    }
  }
};

const postUser = async (user: User) => {
  try {
    const avatar =
      user.avatar !== '' ? await postImage(user.avatar as File) : '';

    const response = await axios.post<User>(baseURL, {
      query: postUserQuery,
      variables: {
        name: user.name,
        email: user.email,
        password: user.password,
        avatar: avatar ? avatar.location : '',
      },
    });
    //console.log('response from postUser APICalls', response);
    return response.data;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
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
  postUser,
  logIn
};
