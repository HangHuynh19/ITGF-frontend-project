import React, { useContext, useEffect, useState } from 'react';
import { MenuItem, MenuList } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import useAppDispatch from '../hooks/useAppDispatch';
import useAppSelector from '../hooks/useAppSelector';
import { fetchAllCategories } from '../store/reducers/categoryReducer';
import { MainContext } from '../contexts/MainContext';
import { filterProducts, sortProducts } from '../store/reducers/productReducer';

const SideMenu = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const categoryList = useAppSelector(
    (state) => state.categoryReducer.categories
  );
  //const [category, setCategory] = useState('All categories');
  const { category, setCategory } = useContext(MainContext);
  const { sortingCondition } = useContext(MainContext);
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

  //console.log('category in SideMenu', category);
  /* useEffect(() => {
    dispatch(
      filterProducts({
        searchTerm: '',
        categoryName: category as string,
      })
    );
  }, [category, dispatch]);

  useEffect(() => {
    dispatch(sortProducts(sortingCondition));
  }, [sortingCondition, dispatch]);
 */
  /* return (
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
              key={category.id}
              onClick={handleMenuItemClick}
            >
              {category.name}
            </MenuItem>
          </Link>
        ))}
      </MenuList>
    </div>
  ); */

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
