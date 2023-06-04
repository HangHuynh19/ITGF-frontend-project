import React, { useContext, useEffect } from 'react';
import { MenuItem, MenuList } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import useAppDispatch from '../hooks/useAppDispatch';
import useAppSelector from '../hooks/useAppSelector';
import { fetchAllCategories } from '../store/reducers/categoryReducer';
import { MainContext } from '../contexts/MainContext';

const SideMenu = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const categoryList = useAppSelector(
    (state) => state.categoryReducer.categories
  );
  const { setCategory } = useContext(MainContext);
  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    setCategory(event.currentTarget.textContent as string);
    navigate('/');
  };

  useEffect(() => {
    const fetchCategories = async () => {
      await dispatch(fetchAllCategories());
    };
    fetchCategories();
  }, [dispatch]);

  return (
    <div className='product-main__side-menu'>
      <MenuList dense>
        <MenuItem
          className='product-main__side-menu__link'
          onClick={handleMenuItemClick}
        >
          All categories
        </MenuItem>
        {categoryList.map((category) => (
          <MenuItem
            className='product-main__side-menu__link'
            key={category.id}
            onClick={handleMenuItemClick}
          >
            {category.name}
          </MenuItem>
        ))}
      </MenuList>
    </div>
  );
};

export default SideMenu;
