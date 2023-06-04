import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Product } from '../interfaces/Product';
import ProductList from '../components/ProductList';
import useAppDispatch from '../hooks/useAppDispatch';
import { filterProducts, sortProducts } from '../store/reducers/productReducer';
import { MainContext } from '../contexts/MainContext';
import useAppSelector from '../hooks/useAppSelector';

const SearchPage = () => {
  const products = useAppSelector((state) => state.productReducer.products);
  const { category } = useContext(MainContext);
  const { searchTerm } = useContext(MainContext);
  const dispatch = useAppDispatch();
  const { sortingCondition } = useContext(MainContext);

  useEffect(() => {
    console.log('searchTerm in SearchPage', searchTerm);
    dispatch(
      filterProducts({
        searchTerm: searchTerm as string,
        categoryName: category as string,
      })
    );
  }, [searchTerm, category, dispatch]);

  useEffect(() => {
    dispatch(sortProducts(sortingCondition));
  }, [sortingCondition, dispatch]);

  return (
    <>
      <ProductList productList={products} />
    </>
  );
};

export default SearchPage;
