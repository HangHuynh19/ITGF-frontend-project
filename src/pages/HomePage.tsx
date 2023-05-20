import React, { useEffect } from 'react';
import ProductList from '../components/ProductList';
import useAppDispatch from '../hooks/useAppDispatch';
import useAppSelector from '../hooks/useAppSelector';
import { fetchAllProducts } from '../store/reducers/productReducer';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const productList = useAppSelector((state) => state.productReducer.products);

  useEffect(() => {
    const fetchProducts = async () => {
      await dispatch(fetchAllProducts());
    };
    fetchProducts();
  }, [dispatch]);

  return (
    <>
      <ProductList productList={productList} />
    </>
  );
};

export default HomePage;
