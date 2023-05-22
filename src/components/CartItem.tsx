import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Link } from 'react-router-dom';

import useAppDispatch from '../hooks/useAppDispatch';
import { ProductWithQuantity } from '../interfaces/Product';
import {
  addToCart,
  deleteFromCart,
  reduceQuantity,
} from '../store/reducers/cartReducer';
import useAppSelector from '../hooks/useAppSelector';

const CartItem = ({ cartItem }: { cartItem: ProductWithQuantity }) => {
  const user = useAppSelector((state) => state.userReducer.user);
  const dispatch = useAppDispatch();
  const handleReduceQuantity = () => {
    dispatch(reduceQuantity(cartItem.id));
  };
  const handleIncreaseQuantity = () => {
    dispatch(addToCart(cartItem));
  };
  const handleDeleteItem = () => {
    dispatch(deleteFromCart(cartItem.id));
  };

  return (
    <Card id='cart-item' variant='outlined'>
      <Link to={`/product/${cartItem.id}`}>
        <div id='cart-item__img-container'>
          <CardMedia
            id='cart-item__img'
            component='img'
            image={cartItem.images[0]}
            alt={cartItem.title}
          />
        </div>
      </Link>
      <CardContent id='cart-item__content'>
        <Typography variant='subtitle1' component='h6'>
          {cartItem.title}
        </Typography>
        <Typography variant='body2' component='p'>
          Price: €{cartItem.price * cartItem.quantity}
        </Typography>
        <Typography
          id='cart-item__content-quantity'
          variant='body2'
          component='p'
        >
          Quantity:
          <IconButton onClick={handleIncreaseQuantity}>
            <AddIcon fontSize='small' />
          </IconButton>
          <span>{cartItem.quantity}</span>
          <IconButton onClick={handleReduceQuantity}>
            <RemoveIcon fontSize='small' />
          </IconButton>
          <IconButton onClick={handleDeleteItem}>
            <DeleteOutlineOutlinedIcon fontSize='small' />
          </IconButton>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CartItem;
