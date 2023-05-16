import axios from 'axios';
import { Product } from '../interfaces/Product';
import {
  getAllCategoriesQuery,
  getAllProductsQuery,
  getAllUsersQuery,
  getProductByIdQuery,
} from './queries';

const baseURL = 'https://api.escuelajs.co/graphql';

const getAllCategories = async <T>(): Promise<T> => {
  try {
    const response = await axios.post(baseURL, {
      query: getAllCategoriesQuery,
    });
    //console.log('response from APICalls', response);
    return response.data.data.categories;
  } catch (error) {
    throw new Error((error as Error).message);
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
    throw new Error((error as Error).message);
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
    throw new Error((error as Error).message);
  }
};

const searchProductsByNameAndCategory = async (
  searchTerm: string,
  categoryName: string
): Promise<Product[]> => {
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
  return filteredProducts;
};

const getAllUsers = async <T>(): Promise<T> => {
  try {
    const response = await axios.post(baseURL, {
      query: getAllUsersQuery,
    });
    //console.log('response from APICalls', response);
    return response.data.data.users;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export {
  getAllCategories,
  getAllProducts,
  getProductById,
  searchProductsByNameAndCategory,
  getAllUsers,
};
