import { MenuItem, MenuList } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getAllCategories } from '../graphql/apiCalls';
import { Category } from '../interfaces/Category';
import useAppDispatch from '../hooks/useAppDispatch';
import useAppSelector from '../hooks/useAppSelector';
import { fetchAllCategories } from '../store/reducers/categoryReducer';
import { Link } from 'react-router-dom';

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
        {categoryList.map((category) => (
          <Link
            to={{
              pathname: '/search',
              search: `?searchTerm=&category=${category.name}`,
            }}
          >
            <MenuItem key={category.id} onClick={handleMenuItemClick}>
              {category.name}
            </MenuItem>
          </Link>
        ))}
      </MenuList>
    </div>
  );
};

export default SideMenu;
