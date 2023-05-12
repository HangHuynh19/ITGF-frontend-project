import React from 'react';
import HomePage from './pages/HomePage';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductRoot from './pages/ProductRoot';

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
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
