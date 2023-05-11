import { MenuItem, MenuList } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getAllCategories } from '../graphql/apiCalls';
import { Category } from '../interfaces/Category';

const SideMenu = () => {
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [category, setCategory] = useState('All categories');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoryList(await getAllCategories());
      } catch (error) {
        throw new Error((error as Error).message);
      }
    };
    fetchCategories();
  }, []);

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    console.log(
      'handleMenuItemClick',
      event.currentTarget.textContent as string
    );
    setCategory(event.currentTarget.textContent as string);
  };

  return (
    <>
      <MenuList dense>
        {categoryList.map((category) => (
          <MenuItem key={category.id} onClick={handleMenuItemClick}>
            {category.name}
          </MenuItem>
        ))}
      </MenuList>
    </>
  );
};

export default SideMenu;
