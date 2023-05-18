import React, { useEffect } from 'react';
import HomePage from './pages/HomePage';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductRoot from './pages/ProductRoot';
import SearchPage from './pages/SearchPage';
import CartPage from './pages/CartPage';
import { ThemeProvider } from '@mui/material/styles';
import globalTheme from './theme/globalTheme';
import useAppSelector from './hooks/useAppSelector';
import useAppDispatch from './hooks/useAppDispatch';
import { fetchUserByAccessToken } from './store/reducers/userReducer';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProductRoot />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/search',
        element: <SearchPage />,
      },
      {
        path: '/product/:id',
        element: <ProductDetailPage />,
      },
    ],
  },
  {
    path: '/cart',
    element: <CartPage />,
  },
]);

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const fetchUser = async () => {
      if (storedToken) {
        await dispatch(fetchUserByAccessToken());
      }
    };
    fetchUser();
  }, [dispatch]);

  return (
    <ThemeProvider theme={globalTheme}>
      <RouterProvider router={router} />;
    </ThemeProvider>
  );
};

export default App;
