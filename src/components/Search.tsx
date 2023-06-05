import React, { useContext, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Autocomplete, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

import CategoryPicker from './CategoryPicker';
import { MainContext } from '../contexts/MainContext';
import useAppSelector from '../hooks/useAppSelector';
import useAppDispatch from '../hooks/useAppDispatch';
import {
  fetchAllProducts,
  filterProducts,
} from '../store/reducers/productReducer';

const Search = () => {
  const navigate = useNavigate();
  const products = useAppSelector((state) => state.productReducer.products);
  const { category, setCategory } = useContext(MainContext);
  const [enteredSearchTerm, setEnteredSearchTerm] = useState('');
  const { searchTerm, setSearchTerm } = useContext(MainContext);
  const handleCategoryChange = (category: string) => {
    console.log('category', category);
    setCategory(category);
  };
  const handleSearchTermChange = (
    event: React.ChangeEvent<{}>,
    value: string
  ) => {
    setEnteredSearchTerm(value);
  };

  const onSearchIconClick = () => {
    setSearchTerm(enteredSearchTerm);
    //setCategory(category);
    //setEnteredSearchTerm('');
    navigate('/');
  };

  return (
    <Box id='header__search-container'>
      <CategoryPicker
        onCategoryChange={handleCategoryChange}
        defaultValue='All categories'
        disable={false}
      />
      <Autocomplete
        id='header__search-container__search-field'
        size='small'
        freeSolo
        disableClearable
        options={products.map((product) => product.title)}
        renderInput={(params) => (
          <TextField
            {...params}
            label='Search'
            variant='outlined'
            color='secondary'
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
        value={enteredSearchTerm}
        onInputChange={handleSearchTermChange}
      />
      <SearchIcon onClick={onSearchIconClick} />
    </Box>
  );
};

export default Search;
