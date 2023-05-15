import React, { useEffect, useState } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { Category } from '../interfaces/Category';
import { getAllCategories } from '../graphql/apiCalls';

const CategoryPicker = ({
  onCategoryChange,
}: {
  onCategoryChange: (category: string) => void;
}) => {
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [category, setCategory] = useState('All categories');

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
    <>
      <FormControl>
        <InputLabel htmlFor='categories'>Categories</InputLabel>
        <Select
          labelId='select-categories'
          id='categories'
          label='Select Category'
          value={category}
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
    </>
  );
};

export default CategoryPicker;
