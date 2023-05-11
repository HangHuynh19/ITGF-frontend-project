import axios from 'axios';
import { Product } from '../interfaces/Product';
import {
  getAllCategoriesQuery,
  getAllProductsQuery,
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

const filterProductsByCategory = (
  categoryName: string,
  productList: Product[]
): Product[] => {
  const filteredProductList = productList.filter(
    (product: Product) => product.category.name === categoryName
  );
  return filteredProductList;
};

export {
  getAllCategories,
  getAllProducts,
  getProductById,
  filterProductsByCategory,
};
