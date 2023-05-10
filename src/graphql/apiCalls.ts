import { Product } from '../interfaces/Product';
import { fetchFromGraphQL } from './fetchFromGraphQL';
import { getAllCategoriesQuery, getAllProductsQuery } from './queries';

const baseURL = 'https://api.escuelajs.co/graphql';

const getAllCategories = async <T>(): Promise<T> => {
  try {
    const response = await fetchFromGraphQL(baseURL, getAllCategoriesQuery, {});
    //console.log('response from APICalls', response);
    return response.categories;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

const getAllProducts = async <T>(): Promise<T> => {
  try {
    const response = await fetchFromGraphQL(baseURL, getAllProductsQuery, {});
    //console.log('response from APICalls', response);
    return response.products;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

const filterProductsByCategory = (
  categoryName: string,
  productList: Product[]
): Product[] => {
  productList.filter(
    (product: Product) => product.category.name === categoryName
  );
  return productList;
};

export { getAllCategories, getAllProducts, filterProductsByCategory };
