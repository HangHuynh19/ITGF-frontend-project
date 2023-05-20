import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Product } from '../interfaces/Product';
import ProductList from '../components/ProductList';
import useAppDispatch from '../hooks/useAppDispatch';
import { filterProducts } from '../store/reducers/productReducer';

const SearchPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('searchTerm');
  const category = searchParams.get('category');
  const dispatch = useAppDispatch();
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await dispatch(
          filterProducts({
            searchTerm: query as string,
            categoryName: category as string,
          })
        );
        setSearchResults(products.payload as Product[]);
      } catch (error) {
        return new Error((error as Error).message);
      }
    };
    fetchProducts();
  }, [query, category, dispatch]);

  return (
    <>
      <ProductList productList={searchResults} />
    </>
  );
};

export default SearchPage;
