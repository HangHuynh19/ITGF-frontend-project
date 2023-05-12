import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import { getAllProducts } from '../graphql/apiCalls';
import ProductList from '../components/ProductList';
import { Product } from '../interfaces/Product';
import { Outlet } from 'react-router-dom';

const HomePage = () => {
  const [productList, setProductList] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setProductList(await getAllProducts());
      } catch (error) {
        throw new Error((error as Error).message);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <ProductList productList={productList} />
    </>
  );
};

export default HomePage;
