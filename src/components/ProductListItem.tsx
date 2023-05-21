import React from 'react';
import { IconButton, ImageListItem, ImageListItemBar } from '@mui/material';
import { Link } from 'react-router-dom';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Product } from '../interfaces/Product';
import useAppSelector from '../hooks/useAppSelector';

const ProductListItem = ({ product }: { product: Product }) => {
  const user = useAppSelector((state) => state.userReducer.user);

  return (
    <>
      <ImageListItem>
        <Link to={`/product/${product.id}`}>
          <img
            className='product-main__image'
            src={`${product.images[0]}?w=248&fit=crop&auto=format`}
            srcSet={`${product.images[0]}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={product.title}
            loading='lazy'
          />
          <ImageListItemBar
            className='product-main__image-title'
            title={product.title}
            subtitle={`€${product.price}`}
          />
        </Link>
      </ImageListItem>
    </>
  );
};

export default ProductListItem;
