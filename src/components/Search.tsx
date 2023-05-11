import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { Category } from '../interfaces/Category';
import {
  getAllCategories,
  getAllProducts,
  filterProductsByCategory,
} from '../graphql/apiCalls';
import { Product } from '../interfaces/Product';

const Search = () => {
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [category, setCategory] = useState('All categories');

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

  /* useEffect(() => {
    const result = async () => {
      try {
        const data = (await getAllProducts()) as Product[];
        const filtered = filterProductsByCategory(category, data);
        console.log('filtered', filtered);
      } catch (error) {
        throw new Error((error as Error).message);
      }
    };
    result();
  }, [category]); */

  const handleCategoryChange = (event: SelectChangeEvent) => {
    //console.log('handleCategoryChange', event.target.value);
    setCategory(event.target.value as string);
  };

  return (
    <div>
      <TextField label='Search' variant='outlined' />
      <FormControl>
        <InputLabel htmlFor='categories'>Categories</InputLabel>
        <Select
          labelId='select-categories'
          id='categories'
          value={category}
          label='Select Category'
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
      <IconButton aria-label='search'>
        <SearchIcon />
      </IconButton>
    </div>
  );
};

export default Search;
