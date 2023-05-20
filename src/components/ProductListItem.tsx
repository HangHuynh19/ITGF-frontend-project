import React from 'react';
import { ImageListItem, ImageListItemBar } from '@mui/material';
import { Link } from 'react-router-dom';

import { Product } from '../interfaces/Product';

const ProductListItem = ({ product }: { product: Product }) => {
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
