import React, { useContext, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Autocomplete, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

import useAppDispatch from '../hooks/useAppDispatch';
import { fetchAllProducts } from '../store/reducers/productReducer';
import CategoryPicker from './CategoryPicker';
import { Product } from '../interfaces/Product';
import { MainContext } from '../contexts/MainContext';

const Search = () => {
  const dispatch = useAppDispatch();
  const [category, setCategory] = useState('All categories');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const { sortingCondition } = useContext(MainContext);
  const handleCategoryChange = (category: string) => {
    setCategory(category);
    console.log('handleCategoryChange', category);
  };
  const handleSearchTermChange = (
    event: React.ChangeEvent<{}>,
    value: string
  ) => {
    setSearchTerm(value);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const allProducts = await dispatch(fetchAllProducts(sortingCondition));
      setSearchResults(allProducts.payload as Product[]);
    };

    fetchProducts();
  }, [dispatch, sortingCondition]);

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
        options={searchResults.map((result) => result.title)}
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
      <Link
        to={{
          pathname: '/search',
          search: `?searchTerm=${searchTerm}&category=${category}`,
        }}
      >
        <SearchIcon />
      </Link>
    </Box>
  );
};

export default Search;
