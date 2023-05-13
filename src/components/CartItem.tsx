import React from 'react';
import { ProductWithQuantity } from '../interfaces/Product';
import {
  Card,
  CardContent,
  IconButton,
  Typography,
} from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';

const CartItem = ({ cartItem }: { cartItem: ProductWithQuantity }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant='subtitle1' component='div'>
          {cartItem.title}
        </Typography>
        <Typography variant='body2' component='div'>
          Price: {cartItem.price} EUR
        </Typography>
        <Typography variant='body2' component='div'>
          Quantity:
          <IconButton>
            <AddCircleOutlineOutlinedIcon />
          </IconButton>
          <span>{cartItem.quantity}</span>
          <IconButton>
            <RemoveCircleOutlineOutlinedIcon />
          </IconButton>
          <IconButton>
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CartItem;
