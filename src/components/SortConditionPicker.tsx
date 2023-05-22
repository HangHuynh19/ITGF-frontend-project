import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import React, { useContext, useState } from 'react';
import { MainContext } from '../contexts/MainContext';

const SortConditionPicker = () => {
  const { sortingCondition, setSortingCondition } = useContext(MainContext);
  const handleConditionChange = (event: SelectChangeEvent<string>) => {
    setSortingCondition((prevCondition) => {
      const newCondition = event.target.value as string;
      console.log('Select event: ', event.target.value);
      console.log('Select condition: ', newCondition);
      return newCondition;
    });
  };

  return (
    <Box>
      <FormControl color='secondary' size='small'>
        <InputLabel
          htmlFor='sort-by-price'
          variant='outlined'
          size='small'
          margin='dense'
        >
          <b>Sort by &nbsp;</b>
        </InputLabel>
        <Select
          labelId='sort-by'
          id='sort-by'
          label='Sort by'
          autoWidth={true}
          value={sortingCondition}
          onChange={handleConditionChange}
          sx={{ fontSize: '0.8rem' }}
        >
          <MenuItem value='Price | lowest to highest' dense={true}>
            Price | lowest to highest
          </MenuItem>
          <MenuItem value='Price | highest to lowest' dense={true}>
            Price | highest to lowest
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SortConditionPicker;
