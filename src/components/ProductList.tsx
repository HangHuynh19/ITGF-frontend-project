import React from 'react';
import { Product } from '../interfaces/Product';
import { Box, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';

const ProductList = ({ productList }: { productList: Product[] }) => {
  return (
    <Box sx={{ width: '100vw', height: '80vh', overflowY: 'scroll' }}>
      <ImageList variant='masonry' cols={3} gap={8}>
        {productList.map((product) => (
          <ImageListItem key={product.id}>
            <Link to={`/product/${product.id}`}>
              <img
                className='product-main__image'
                src={`${product.images[0]}?w=248&fit=crop&auto=format`}
                srcSet={`${product.images[0]}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={product.title}
                loading='lazy'
                //style={{ width: '100%', objectFit: 'cover' }}
              />
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
    </Box>
  );
};

export default ProductList;
