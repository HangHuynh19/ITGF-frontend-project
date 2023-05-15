import React, { useEffect, useState } from 'react';

import TextField from '@mui/material/TextField';
import CategoryPicker from './CategoryPicker';
import { Product } from '../interfaces/Product';
import { searchProductsByNameAndCategory } from '../graphql/apiCalls';
import {
  Autocomplete,
  IconButton,
  List,
  ListItem,
  MenuItem,
  Select,
} from '@mui/material';
import { getAllProducts } from '../graphql/apiCalls';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

const Search = () => {
  const [category, setCategory] = useState('All categories');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  const handleCategoryChange = (category: string) => {
    //console.log('handleCategoryChange', category);
    setCategory(category);
  };

  const handleSearchTermChange = (
    event: React.ChangeEvent<{}>,
    value: string
  ) => {
    console.log('handleSearchTermChange', value);
    setSearchTerm(value);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setSearchResults(await getAllProducts());
      } catch (error) {
        throw new Error((error as Error).message);
      }
    };

    fetchProducts();
  }, []);

  console.log('searchResults', searchTerm, category);
  return (
    <div>
      <Autocomplete
        freeSolo
        disableClearable
        options={searchResults.map((result) => result.title)}
        renderInput={(params) => (
          <TextField
            {...params}
            label='Search'
            variant='outlined'
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
        //value={searchTerm}
        onInputChange={handleSearchTermChange}
      />
      <CategoryPicker onCategoryChange={handleCategoryChange} />
      <IconButton>
        <Link
          to={{
            pathname: '/search',
            search: `?searchTerm=${searchTerm}&category=${category}`,
          }}
        >
          <SearchIcon />
        </Link>
      </IconButton>
    </div>
  );
};

export default Search;
