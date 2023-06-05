import React, { useContext, useEffect } from 'react';
import { Box, ImageList } from '@mui/material';

import { Product } from '../interfaces/Product';
import ProductListItem from './ProductListItem';
import useAppSelector from '../hooks/useAppSelector';
import { MainContext } from '../contexts/MainContext';
import useAppDispatch from '../hooks/useAppDispatch';
import {
  fetchAllProducts,
  filterProducts,
  sortProducts,
} from '../store/reducers/productReducer';

const ProductList = (/* { productList }: { productList: Product[] } */) => {
  const products = useAppSelector(
    (state) => state.productReducer.filteredProducts
  );
  /* const products2 = useAppSelector(
    (state) => state.productReducer.filteredProducts
  ); */
  const { category } = useContext(MainContext);
  const { searchTerm } = useContext(MainContext);
  const dispatch = useAppDispatch();
  const { sortingCondition } = useContext(MainContext);

  useEffect(() => {
    if (!searchTerm && category === 'All categories') {
      const fetchProducts = async () => {
        await dispatch(fetchAllProducts());
      };
      fetchProducts();
    }
    //console.log('all products', products2);
  }, [dispatch, category, searchTerm]);

  useEffect(() => {
    console.log('category', category);
    console.log('searchTerm', searchTerm);
    dispatch(
      filterProducts({
        searchTerm: searchTerm as string,
        categoryName: category as string,
      })
    );
  }, [searchTerm, category, dispatch]);

  useEffect(() => {
    dispatch(sortProducts(sortingCondition));
  }, [products, sortingCondition, dispatch]);

  return (
    <Box sx={{ height: '80vh', overflowY: 'scroll' }}>
      <ImageList cols={4} gap={8}>
        {products.map((product) => (
          <ProductListItem key={product.id} product={product} />
        ))}
      </ImageList>
    </Box>
  );
};

export default ProductList;
