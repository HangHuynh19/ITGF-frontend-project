import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { Product } from '../interfaces/Product';
import { ImageListItem, ImageListItemBar } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { searchProductsByNameAndCategory } from '../graphql/apiCalls';
import ProductListItem from '../components/ProductListItem';
import ProductList from '../components/ProductList';

const SearchPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('searchTerm');
  const category = searchParams.get('category');
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await searchProductsByNameAndCategory(
          query as string,
          category as string
        );
        setSearchResults(products);
      } catch (error) {
        throw new Error((error as Error).message);
      }
    };
    fetchProducts();
  }, [query, category]);

  return (
    <>
      <ProductList productList={searchResults} />
    </>
  );
};

export default SearchPage;
