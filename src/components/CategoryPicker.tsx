import React, { useEffect, useState } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

import { Category } from '../interfaces/Category';
import { getAllCategories } from '../graphql/apiCalls';

type CategoryPickerProps = {
  onCategoryChange: (category: string) => void;
  defaultValue: string;
  disable?: boolean;
};

const CategoryPicker: React.FC<CategoryPickerProps> = ({
  onCategoryChange,
  defaultValue,
  disable,
}) => {
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [category, setCategory] = useState(defaultValue);
  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
    onCategoryChange(event.target.value as string);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoryList(await getAllCategories());
      } catch (error) {
        throw new Error((error as Error).message);
      }
    };
    fetchCategories();
  }, []);

  return (
    <Box id='header__search-container__category-picker'>
      <FormControl color='secondary' size='small'>
        <InputLabel htmlFor='categories'>Category</InputLabel>
        <Select
          labelId='select-categories'
          id='categories'
          label='Select Category'
          value={category}
          disabled={disable}
          onChange={handleCategoryChange}
        >
          <MenuItem value='All categories'>All Categories</MenuItem>
          {categoryList.length > 0 &&
            categoryList.map((category) => (
              <MenuItem key={category.id} value={category.name}>
                {category.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CategoryPicker;
