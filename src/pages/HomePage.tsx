import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Product } from '../interfaces/Product';
import ProductList from '../components/ProductList';
import useAppDispatch from '../hooks/useAppDispatch';
import {
  fetchAllProducts,
  filterProducts,
  sortProducts,
} from '../store/reducers/productReducer';
import { MainContext } from '../contexts/MainContext';
import useAppSelector from '../hooks/useAppSelector';

const HomePage = () => {
  const products = useAppSelector(
    (state) => state.productReducer.filteredProducts
  );
  const { category } = useContext(MainContext);
  const { searchTerm } = useContext(MainContext);
  const dispatch = useAppDispatch();
  const { sortingCondition } = useContext(MainContext);

  useEffect(() => {
    //if (!searchTerm && category === 'All categories') {
    const fetchProducts = async () => {
      await dispatch(fetchAllProducts());
    };
    fetchProducts();
    //}
  }, [dispatch /* , searchTerm, category */]);

  useEffect(() => {
    //if (searchTerm || category !== 'All categories') {
    dispatch(
      filterProducts({
        searchTerm: searchTerm as string,
        categoryName: category as string,
      })
    );
    //}
  }, [searchTerm, category, dispatch]);

  useEffect(() => {
    dispatch(sortProducts(sortingCondition));
  }, [products, sortingCondition, dispatch]);

  /* useEffect(() => {
    console.log('products in HomePage', products);
  }, [products]); */

  return (
    <>
      <ProductList productList={products} />
    </>
  );
};

export default HomePage;
