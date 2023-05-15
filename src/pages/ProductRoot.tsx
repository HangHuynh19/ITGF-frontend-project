import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import { Product } from '../interfaces/Product';

const ProductRoot = () => {
  return (
    <>
      <Header />
      <div className='product-main'>
        <SideMenu />
        <Outlet />
      </div>
    </>
  );
};

export default ProductRoot;
