import React from 'react';
import HomePage from './pages/HomePage';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductRoot from './pages/ProductRoot';
import CartPage from './pages/CartPage';
import {ThemeProvider} from '@mui/material/styles';
import globalTheme from './theme/globalTheme';

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
  return (
    <ThemeProvider theme={globalTheme}>
      <RouterProvider router={router} />;
    </ThemeProvider>
  )
};

export default App;
