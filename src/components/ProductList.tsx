import React from 'react';
import { Product } from '../interfaces/Product';
import { Box, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import { Link } from 'react-router-dom';

const ProductList = ({ productList }: { productList: Product[] }) => {
  return (
    <Box sx={{ height: '80vh', overflowY: 'scroll' }}>
      <ImageList cols={3} gap={8}>
        {productList.map((product) => (
          <ImageListItem key={product.id}>
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
                subtitle={`${product.price} EUR`}
              />
            </Link>
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};

export default ProductList;
