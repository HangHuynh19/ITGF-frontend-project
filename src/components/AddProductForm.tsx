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
import useAppSelector from '../hooks/useAppSelector';
import useAppDispatch from '../hooks/useAppDispatch';
import CategoryPicker from './CategoryPicker';
import { ProductInput } from '../interfaces/Product';
import { createProduct } from '../store/reducers/productReducer';

const AddProductForm = ({
  open,
  onClose,
  onProductCreated,
}: {
  open: boolean;
  onClose: () => void;
  onProductCreated: () => void;
}) => {
  const categories = useAppSelector(
    (state) => state.categoryReducer.categories
  );
  const dispatch = useAppDispatch();
  const title = useInputHook('');
  const price = useInputHook('');
  const description = useInputHook('');
  const [category, setCategory] = useState('All categories');
  const [image, setImage] = useState<File | null>(null);

  const handleCancel = () => {
    onClose();
  };

  const handleCategoryChange = (category: string) => {
    //console.log('handleCategoryChange', category);
    setCategory(category);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onClose();

    const categoryId = categories.find((c) => c.name === category)?.id;
    console.log('categoryId from AddProductForm', category);
    const productInput: ProductInput = {
      title: title.value,
      price: Number(price.value),
      description: description.value,
      categoryId: Number(categoryId),
      images: [image as File],
    };

    console.log('productInput from AddProductForm', productInput);
    await dispatch(createProduct(productInput));

    onProductCreated();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box id='create-product-form' component='form' onSubmit={handleSubmit}>
        <Typography id='create-product-form__form-title' variant='h5'>
          Add Product
        </Typography>
        <TextField
          id='create-product-form__title'
          label='Title'
          value={title.value}
          variant='outlined'
          color='secondary'
          onChange={title.onChange}
        />
        <div id='create-product-form__category-picker-and-price'>
          <CategoryPicker
            defaultValue='All categories'
            onCategoryChange={handleCategoryChange}
          />
          <TextField
            id='create-product-form__price'
            label='Price'
            value={price.value}
            variant='outlined'
            color='secondary'
            onChange={price.onChange}
          />
        </div>
        <TextField
          id='create-product-form__description'
          label='Description'
          multiline
          maxRows={4}
          value={description.value}
          variant='outlined'
          color='secondary'
          onChange={description.onChange}
        />
        <Input
          id='create-product-form__image'
          type='file'
          disableUnderline={true}
          inputProps={{ accept: 'image/*' }}
          onChange={handleImageChange}
        />
        <div id='create-product-form__btnGroup'>
          <Button
            id='create-product-form__cancelBtn'
            variant='contained'
            color='secondary'
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            id='create-product-form__submitBtn'
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

export default AddProductForm;
