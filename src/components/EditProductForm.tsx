import {
  Box,
  Button,
  Input,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import useInputHook from '../hooks/useInputHook';
import CategoryPicker from './CategoryPicker';
import { Product, ProductInput } from '../interfaces/Product';
import useAppSelector from '../hooks/useAppSelector';
import useAppDispatch from '../hooks/useAppDispatch';
import {
  fetchAllProducts,
  fetchProductById,
  updateProduct,
} from '../store/reducers/productReducer';
import { updateCartWhenProductUpdated } from '../store/reducers/cartReducer';

const EditProductForm = ({
  open,
  onClose,
  product,
  onProductUpdate,
}: {
  open: boolean;
  onClose: () => void;
  product: Product;
  onProductUpdate: () => void;
}) => {
  const products = useAppSelector((state) => state.productReducer.products);
  const dispatch = useAppDispatch();
  const title = useInputHook(product.title);
  const price = useInputHook(product.price.toString());
  const description = useInputHook(product.description);
  const category = useInputHook(product.category.name);
  const [image, setImage] = useState<File | null>(null);

  const handleCancel = () => {
    title.reset();
    price.reset();
    description.reset();
    category.reset();
    setImage(null);
    onClose();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onClose();

    const productInput: ProductInput = {
      title: title.value,
      price: Number(price.value),
      description: description.value,
      images: image === null ? product.images : [image as File],
    };

    await dispatch(
      updateProduct({
        id: product.id,
        product: productInput,
      })
    );

    const updatedProduct = await dispatch(fetchProductById(product.id));
    console.log('updateProduct in EditProductForm', updatedProduct);

    dispatch(
      updateCartWhenProductUpdated({
        id: product.id,
        product: updatedProduct.payload as Product,
      })
    );

    onProductUpdate();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box id='edit-product-form' component='form' onSubmit={handleSubmit}>
        <Typography id='edit-product-form__form-title' variant='h5'>
          Edit Product
        </Typography>
        <TextField
          id='edit-product-form__title'
          label='Title'
          value={title.value}
          variant='outlined'
          color='secondary'
          onChange={title.onChange}
        />
        <TextField
          id='edit-product-form__price'
          label='Price'
          type='number'
          value={price.value}
          variant='outlined'
          color='secondary'
          onChange={price.onChange}
        />
        <TextField
          id='edit-product-form__description'
          label='Description'
          multiline
          maxRows={4}
          value={description.value}
          variant='outlined'
          color='secondary'
          onChange={description.onChange}
        />
        <Input
          id='edit-product-form__image'
          type='file'
          disableUnderline={true}
          inputProps={{ accept: 'image/*' }}
          onChange={handleImageChange}
        />
        <div id='edit-product-form__btnGroup'>
          <Button
            id='edit-product-form__cancelBtn'
            variant='contained'
            color='secondary'
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            id='edit-product-form__submitBtn'
            variant='contained'
            color='primary'
            type='submit'
          >
            Submit
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default EditProductForm;
