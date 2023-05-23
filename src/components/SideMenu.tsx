import React, { useEffect, useState } from 'react';
import { MenuItem, MenuList } from '@mui/material';
import { Link } from 'react-router-dom';

import useAppDispatch from '../hooks/useAppDispatch';
import useAppSelector from '../hooks/useAppSelector';
import { fetchAllCategories } from '../store/reducers/categoryReducer';

const SideMenu = () => {
  const dispatch = useAppDispatch();
  const categoryList = useAppSelector(
    (state) => state.categoryReducer.categories
  );
  const [category, setCategory] = useState('All categories');

  useEffect(() => {
    const fetchCategories = async () => {
      await dispatch(fetchAllCategories());
    };
    fetchCategories();
  }, [dispatch]);

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    setCategory(event.currentTarget.textContent as string);
  };

  return (
    <div className='product-main__side-menu'>
      <MenuList dense>
        <Link
          className='product-main__side-menu__link'
          to={{
            pathname: '/search',
            search: `?searchTerm=&category=All categories`,
          }}
          key='all-categories-link'
        >
          <MenuItem
            className='product-main__side-menu__link'
            onClick={handleMenuItemClick}
          >
            All categories
          </MenuItem>
        </Link>
        {categoryList.map((category) => (
          <Link
            className='product-main__side-menu__link'
            to={{
              pathname: '/search',
              search: `?searchTerm=&category=${category.name}`,
            }}
            key={category.id}
          >
            <MenuItem
              className='product-main__side-menu__link'
              onClick={handleMenuItemClick}
            >
              {category.name}
            </MenuItem>
          </Link>
        ))}
      </MenuList>
    </div>
  );
};

export default SideMenu;
