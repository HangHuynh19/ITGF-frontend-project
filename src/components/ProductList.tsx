import React from 'react';
import { Box, ImageList } from '@mui/material';

import { Product } from '../interfaces/Product';
import ProductListItem from './ProductListItem';

const ProductList = ({ productList }: { productList: Product[] }) => {
  return (
    <Box sx={{ height: '80vh', overflowY: 'scroll' }}>
      <ImageList cols={4} gap={8}>
        {productList.map((product) => (
          <ProductListItem key={product.id} product={product} />
        ))}
      </ImageList>
    </Box>
  );
};

export default ProductList;
