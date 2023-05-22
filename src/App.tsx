import React, { useEffect } from 'react';
import HomePage from './pages/HomePage';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ProductDetailPage from './pages/ProductDetailPage';
import Root from './pages/Root';
import SearchPage from './pages/SearchPage';
import CartPage from './pages/CartPage';
import { ThemeProvider } from '@mui/material/styles';
import globalTheme from './theme/globalTheme';
import ProfilePage from './pages/ProfilePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
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
  {
    path: '/profile',
    element: <ProfilePage />,
  },
]);

const App = () => {
  return (
    <ThemeProvider theme={globalTheme}>
      <RouterProvider router={router} />;
    </ThemeProvider>
  );
};

export default App;
