import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Button } from '@mui/material';

import SideMenu from '../components/SideMenu';
import useAppDispatch from '../hooks/useAppDispatch';
import { fetchAllProducts } from '../store/reducers/productReducer';
import useAppSelector from '../hooks/useAppSelector';
import SortConditionPicker from '../components/SortConditionPicker';
import ProductForm from '../components/ProductForm';

const MenuAndFilter = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.authReducer.isLoggedIn);
  const [isCreateProductModalOpen, setIsCreateProductModalOpen] =
    useState(false);
  const handleOpenCreateProductModal = () => {
    setIsCreateProductModalOpen(true);
  };
  const handleCloseCreateProductModal = () => {
    setIsCreateProductModalOpen(false);
  };
  const handleProductCreated = () => {
    dispatch(fetchAllProducts('Price | lowest to highest'));
  };

  return (
    <>
      <div className='product-main'>
        <SideMenu />
        <div className='product-main__list'>
          <div id='product-main__btn-group'>
            <SortConditionPicker />
            {isLoggedIn && (
              <Button
                id='product-main__btn-group__btn-add-product'
                variant='contained'
                color='secondary'
                onClick={handleOpenCreateProductModal}
              >
                Add Product
              </Button>
            )}
          </div>
          <ProductForm
            formTitle='Add Product'
            open={isCreateProductModalOpen}
            onClose={handleCloseCreateProductModal}
            onFormSubmit={handleProductCreated}
          />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MenuAndFilter;
