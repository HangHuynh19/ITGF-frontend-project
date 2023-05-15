import React from 'react';
import { Product } from '../interfaces/Product';
import {
  Box,
  Button,
  IconButton,
  ImageList,
  ImageListItem,
} from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
//import useAppSelector from '../hooks/useAppSelector';
import useAppDispatch from '../hooks/useAppDispatch';
import { addToCart } from '../store/reducers/cartReducer';

const ProductDetail = ({ product }: { product: Product }) => {
  //const {cart, loading, error} = useAppSelector(state => state.cartReducer);
  const dispatch = useAppDispatch();
  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

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
        <h1>{product.title}</h1>
        <p>{product.price} EUR</p>
        <p>{product.description}</p>
        <div>
          <Button variant='contained' onClick={handleAddToCart}>
            Add to cart
          </Button>
          <IconButton>
            <FavoriteBorderOutlinedIcon />
          </IconButton>
        </div>
      </article>
    </div>
  );
};

export default ProductDetail;
