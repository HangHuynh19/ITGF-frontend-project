import React from 'react';
import { Product } from '../interfaces/Product';
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';

const ProductList = ({ productList }: { productList: Product[] }) => {
  return (
    <ImageList variant='masonry' cols={3} gap={8}>
      {productList.map((product) => (
        <ImageListItem key={product.id}>
          <Link to={`/product/${product.id}`}>
            <img src={product.images[0]} alt={product.title} loading='lazy' />
            <ImageListItemBar
              title={product.title}
              subtitle={`${product.price} EUR`}
              actionIcon={
                <InfoIcon
                  sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                  aria-label={`info about ${product.title}`}
                />
              }
            />
          </Link>
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default ProductList;
