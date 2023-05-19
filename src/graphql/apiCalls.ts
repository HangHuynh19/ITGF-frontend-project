import axios from 'axios';
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

const baseURL = 'https://api.escuelajs.co/graphql';
const restURL = 'https://api.escuelajs.co/api/v1/auth/profile';
const uploadImageURL = 'https://api.escuelajs.co/api/v1/files/upload';

const getAllCategories = async <T>(): Promise<T> => {
  const response = await axios.post(baseURL, {
    query: getAllCategoriesQuery,
  });
  //console.log('response from APICalls', response);
  return response.data.data.categories;
};

const getAllProducts = async <T>(): Promise<T> => {
  const response = await axios.post(baseURL, {
    query: getAllProductsQuery,
  });
  //console.log('response from APICalls', response);
  return response.data.data.products;
};

const getProductById = async <T>(id: number): Promise<T> => {
  console.log('id from APICalls', id);

  const response = await axios.post(baseURL, {
    query: getProductByIdQuery,
    variables: { id: id },
  });
  console.log('response from APICalls', response);
  return response.data.data.product;
};

const searchProductsByNameAndCategory = async <T>(
  searchTerm: string,
  categoryName: string
): Promise<T> => {
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
};

const getAllUsers = async <T>(): Promise<T> => {
  const response = await axios.post(baseURL, {
    query: getAllUsersQuery,
  });
  //console.log('response from APICalls', response);
  return response.data.data.users;
};

const logingIn = async <T>(email: string, password: string): Promise<T> => {
  const response = await axios.post(baseURL, {
    query: loginQuery,
    variables: {
      email: email,
      password: password,
    },
  });

  return response.data.data.login;
};

const getUserByAccessToken = async <T>(accessToken: string): Promise<T> => {
  const response = await axios.get(restURL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  console.log('response from APICalls', response.data);
  return response.data;
};

const postImage = async (file: File): Promise<ImageResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  const imageUrl = await axios.post<ImageResponse>(uploadImageURL, formData);
  //console.log('Image upload succesfully from postImage APICalls', imageUrl);
  return imageUrl.data;
};

const postUser = async (user: User) => {
  const avatar = user.avatar !== '' ? await postImage(user.avatar as File) : '';

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
};
