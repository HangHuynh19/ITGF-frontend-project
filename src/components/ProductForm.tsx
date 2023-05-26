import { useState } from 'react';
import useAppDispatch from '../hooks/useAppDispatch';
import useAppSelector from '../hooks/useAppSelector';
import useInputHook from '../hooks/useInputHook';
import { Product, ProductInput } from '../interfaces/Product';
import {
  createProduct,
  fetchProductById,
  updateProduct,
} from '../store/reducers/productReducer';
import { updateCartWhenProductUpdated } from '../store/reducers/cartReducer';
import {
  Box,
  Button,
  Input,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import CategoryPicker from './CategoryPicker';

const ProductForm = ({
  formTitle,
  product,
  open,
  onClose,
  onFormSubmit,
}: {
  formTitle: string;
  product?: Product;
  open: boolean;
  onClose: () => void;
  onFormSubmit: () => void;
}) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(
    (state) => state.categoryReducer.categories
  );
  const title = useInputHook(product?.title || '');
  const price = useInputHook(product?.price.toString() || '');
  const description = useInputHook(product?.description || '');
  const [category, setCategory] = useState(
    product?.category.name || 'All categories'
  );
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState('');
  const handleCategoryChange = (category: string) => {
    setCategory(category);
    console.log(category);
  };
  const handleCancel = () => {
    title.reset();
    price.reset();
    description.reset();
    setCategory('All categories');
    setImage(null);
    setError('');
    onClose();
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (category === 'All categories') {
      setError('Please select a category');
      return;
    }

    if (Number(price.value) <= 0) {
      setError('Price must be greater than 0');
      return;
    }

    onClose();

    if (formTitle === 'Add Product') {
      const categoryId = categories.find((c) => c.name === category)?.id;
      const productInput: ProductInput = {
        title: title.value,
        price: Number(price.value),
        description: description.value,
        categoryId: Number(categoryId),
        images: [image as File],
      };
      await dispatch(createProduct(productInput));
    }

    if (formTitle === 'Edit Product') {
      const productInput: ProductInput = {
        title: title.value,
        price: Number(price.value),
        description: description.value,
        images: image === null ? (product as Product).images : [image as File],
      };

      await dispatch(
        updateProduct({
          id: (product as Product).id,
          product: productInput,
        })
      );

      const updatedProduct = await dispatch(
        fetchProductById((product as Product).id)
      );

      dispatch(
        updateCartWhenProductUpdated({
          id: (product as Product).id,
          product: updatedProduct.payload as Product,
        })
      );
    }

    onFormSubmit();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box id='product-form' component='form' onSubmit={handleSubmit}>
        <Typography id='product-form__form-title' variant='h5'>
          {formTitle}
        </Typography>
        <TextField
          id='product-form__title'
          label='Title'
          value={title.value}
          variant='outlined'
          color='secondary'
          required={formTitle === 'Add Product'}
          onChange={title.onChange}
        />
        <div id='product-form__category-picker-and-price'>
          <CategoryPicker
            defaultValue={
              formTitle === 'Add Product'
                ? 'All categories'
                : (product as Product).category.name
            }
            onCategoryChange={handleCategoryChange}
            disable={formTitle === 'Edit Product'}
          />
          <TextField
            id='product-form__price'
            label='Price'
            required={formTitle === 'Add Product'}
            variant='outlined'
            color='secondary'
            type='number'
            onChange={price.onChange}
            value={price.value}
          />
        </div>
        {error && (
          <Typography id='product-form__error' variant='body2' color='error'>
            {error}
          </Typography>
        )}
        <TextField
          id='product-form__description'
          label='Description'
          multiline
          maxRows={4}
          value={description.value}
          variant='outlined'
          color='secondary'
          required={formTitle === 'Add Product'}
          onChange={description.onChange}
        />
        <Input
          id='product-form__image'
          type='file'
          required={formTitle === 'Add Product'}
          disableUnderline={true}
          inputProps={{ accept: 'image/*' }}
          onChange={handleImageChange}
        />
        <div id='product-form__btnGroup'>
          <Button
            id='product-form__cancelBtn'
            variant='contained'
            color='secondary'
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            id='product-form__submitBtn'
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

export default ProductForm;
