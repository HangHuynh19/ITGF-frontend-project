import React from 'react';
import { Product } from '../interfaces/Product';
import {
  Button,
  IconButton,
  ImageList,
  ImageListItem,
  Typography,
} from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import useAppDispatch from '../hooks/useAppDispatch';
import { addToCart } from '../store/reducers/cartReducer';
import useAppSelector from '../hooks/useAppSelector';
import { User } from '../interfaces/User';
import { fetchUserByAccessToken } from '../store/reducers/userReducer';

const ProductDetail = ({ product }: { product: Product }) => {
  const user = useAppSelector((state) => state.userReducer.user);
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    console.log('user in ProductDetail', user);
    if (!user) {
      dispatch(fetchUserByAccessToken());
    } else {
      dispatch(addToCart(product));
    }
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
        <Typography component='h1'>{product.title}</Typography>
        <Typography component='p'>
          <b>Price:</b> €{product.price}
        </Typography>
        <Typography component='p'>
          <b>Description:</b> <br /> {product.description}
        </Typography>
        <div id='product-detail__content__btn-group'>
          <Button
            variant='contained'
            color='secondary'
            onClick={handleAddToCart}
          >
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
