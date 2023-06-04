import React, { useContext, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Autocomplete, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

import useAppDispatch from '../hooks/useAppDispatch';
import { fetchAllProducts } from '../store/reducers/productReducer';
import CategoryPicker from './CategoryPicker';
import { Product } from '../interfaces/Product';
import { MainContext } from '../contexts/MainContext';
import useAppSelector from '../hooks/useAppSelector';

const Search = () => {
  const navigate = useNavigate();
  const products = useAppSelector((state) => state.productReducer.products);
  //const [category, setCategory] = useState('All categories');
  const { category, setCategory } = useContext(MainContext);
  //const [searchTerm, setSearchTerm] = useState('');
  const [enteredSearchTerm, setEnteredSearchTerm] = useState('');
  const { searchTerm, setSearchTerm } = useContext(MainContext);
  //const [searchResults, setSearchResults] = useState<Product[]>([]);
  const { sortingCondition } = useContext(MainContext);

  const handleCategoryChange = (category: string) => {
    setCategory(category);
    //console.log('handleCategoryChange', category);
  };
  const handleSearchTermChange = (
    event: React.ChangeEvent<{}>,
    value: string
  ) => {
    setEnteredSearchTerm(value);
    //console.log('handleSearchTermChange', value);
  };
  const onSearchIconClick = () => {
    setSearchTerm(enteredSearchTerm);
    //setCategory(category);
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
        onInputChange={handleSearchTermChange}
      />
      {/* <Link
        to={{
          pathname: '/search',
          search: `?searchTerm=${searchTerm}&category=${category}`,
        }}
      > */}
      <SearchIcon onClick={onSearchIconClick} />
      {/*  </Link> */}
    </Box>
  );
};

export default Search;
