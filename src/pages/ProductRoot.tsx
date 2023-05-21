import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import { Product } from '../interfaces/Product';
import { Button } from '@mui/material';
import AddProductForm from '../components/AddProductForm';
import useAppDispatch from '../hooks/useAppDispatch';
import {fetchAllProducts} from '../store/reducers/productReducer';

const ProductRoot = () => {
  const dispatch = useAppDispatch();
  const [isCreateProductModalOpen, setIsCreateProductModalOpen] = useState(false);
  const handleOpenCreateProductModal = () => {
    setIsCreateProductModalOpen(true);
  };
  const handleCloseCreateProductModal = () => {
    setIsCreateProductModalOpen(false);
  };

  const handleProductCreated = () => {
    dispatch(fetchAllProducts());
  };

  return (
    <>
      <Header />
      <div className='product-main'>
        <SideMenu />
        <div>
          <Button variant='contained' color='secondary' onClick={handleOpenCreateProductModal}>
            Add Product
          </Button>
          <AddProductForm open={isCreateProductModalOpen} onClose={handleCloseCreateProductModal} onProductCreated={handleProductCreated} />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default ProductRoot;
