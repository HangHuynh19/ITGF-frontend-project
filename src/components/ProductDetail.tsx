import React, { useEffect, useState } from 'react';
import { Product } from '../interfaces/Product';
import {
  Button,
  IconButton,
  ImageList,
  ImageListItem,
  Typography,
} from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useNavigate, useParams } from 'react-router-dom';

import useAppDispatch from '../hooks/useAppDispatch';
import {
  addToCart,
  updateCartWhenProductDeleted,
} from '../store/reducers/cartReducer';
import useAppSelector from '../hooks/useAppSelector';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  fetchAllProducts,
  fetchProductById,
  removeProduct,
} from '../store/reducers/productReducer';
import ProductForm from './ProductForm';

const ProductDetail = (/* { product }: { product: Product } */) => {
  const id = parseInt(useParams<{ id: string }>().id as string);
  const user = useAppSelector((state) => state.userReducer.user);
  const product = useAppSelector(
    (state) => state.productReducer.filteredProducts[0]
  );
  console.log('product', product);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector((state) => state.authReducer.isLoggedIn);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };
  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };
  const handleProductUpdate = () => {
    dispatch(fetchProductById(product.id));
  };
  const handleProductDelete = () => {
    dispatch(removeProduct(product.id));
    dispatch(updateCartWhenProductDeleted(product.id));
    navigate('/');
  };

  /* useEffect(() => {
    const fetchProducts = async () => {
      await dispatch(fetchAllProducts());
    };
    fetchProducts();
  }, [dispatch]); */

  useEffect(() => {
    const fetchProduct = async () => {
      await dispatch(fetchProductById(id));
    };
    fetchProduct();
  }, [dispatch, id]);

  return (
    <div id='product-detail'>
      <div id='product-detail__img'>
        <ImageList variant='masonry' cols={2} gap={8}>
          {product.images.map((image, index) => (
            <ImageListItem key={index}>
              <img
                src={image}
                alt={product.title}
                loading='lazy'
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
      <article id='product-detail__content'>
        <Typography component='h1'>{product.title}</Typography>
        <Typography component='p'>
          <b>Price:</b> €{product.price}
        </Typography>
        <Typography component='p'>
          <b>Description:</b> <br /> {product.description}
        </Typography>
        <Typography component='p'>
          <b>Category:</b> <br /> {product.category.name}
        </Typography>
        {isLoggedIn && (
          <div id='product-detail__content__btn-group'>
            <Button
              variant='contained'
              color='secondary'
              onClick={handleAddToCart}
            >
              Add to cart
            </Button>
            {user?.role === 'admin' && (
              <>
                <IconButton onClick={handleOpenEditModal}>
                  <BorderColorIcon color='secondary' />
                </IconButton>
                <ProductForm
                  formTitle='Edit Product'
                  product={product}
                  open={isEditModalOpen}
                  onClose={handleCloseEditModal}
                  onFormSubmit={handleProductUpdate}
                />
                <IconButton onClick={handleProductDelete}>
                  <DeleteIcon color='secondary' />
                </IconButton>
              </>
            )}
          </div>
        )}
      </article>
    </div>
  );
};

export default ProductDetail;
