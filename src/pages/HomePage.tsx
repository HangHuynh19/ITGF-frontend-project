import React, { useContext, useEffect } from 'react';
import ProductList from '../components/ProductList';
import useAppDispatch from '../hooks/useAppDispatch';
import useAppSelector from '../hooks/useAppSelector';
import { fetchAllProducts } from '../store/reducers/productReducer';
import { MainContext } from '../contexts/MainContext';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const productList = useAppSelector((state) => state.productReducer.products);
  const { sortingCondition } = useContext(MainContext);

  useEffect(() => {
    const fetchProducts = async () => {
      await dispatch(fetchAllProducts(sortingCondition));
    };
    fetchProducts();
  }, [dispatch, sortingCondition]);

  return (
    <>
      <ProductList productList={productList} />
    </>
  );
};

export default HomePage;
