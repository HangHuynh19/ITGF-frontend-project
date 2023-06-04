import React, { useContext, useEffect } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

import { MainContext } from '../contexts/MainContext';

const SortConditionPicker = () => {
  const { sortingCondition, setSortingCondition } = useContext(MainContext);
  const handleConditionChange = (event: SelectChangeEvent<string>) => {
    setSortingCondition((prevCondition) => {
      const newCondition = event.target.value as string;
      console.log('sortingCondition', newCondition);
      return newCondition;
    });
  };

  useEffect(() => {
    setSortingCondition('None');
  }, [setSortingCondition]);

  return (
    <Box>
      <FormControl color='secondary' size='small'>
        <InputLabel
          htmlFor='sort-by-price'
          variant='outlined'
          size='normal'
          shrink={true}
        >
          <b>Sort by &nbsp;</b>
        </InputLabel>
        <Select
          labelId='sort-by'
          id='sort-by'
          label='Sort by'
          value={sortingCondition}
          defaultValue='None'
          onChange={handleConditionChange}
          sx={{ fontSize: '0.8rem', width: '20em' }}
        >
          <MenuItem value='None' dense={true}>
            None
          </MenuItem>
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
