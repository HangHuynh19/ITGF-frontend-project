import React, { useEffect } from 'react';
import HomePage from './pages/HomePage';
import {
  Navigate,
  Navigation,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
  useNavigate,
} from 'react-router-dom';
import ProductDetailPage from './pages/ProductDetailPage';
import Root from './pages/Root';
import SearchPage from './pages/SearchPage';
import CartPage from './pages/CartPage';
import { ThemeProvider } from '@mui/material/styles';
import globalTheme from './theme/globalTheme';
import ProfilePage from './pages/ProfilePage';
import useAppSelector from './hooks/useAppSelector';

export const ProtectedRoute = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const isLoggedIn = useAppSelector((state) => state.authReducer.isLoggedIn);
  if (!isLoggedIn) {
    return <Navigate to='/' />;
  }
  return children;
};

/* const router = createBrowserRouter([
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
 */

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Root />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/product/:id' element={<ProductDetailPage />} />
      </Route>
      <Route
        path='/cart'
        element={
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        }
      />
      <Route
        path='/profile'
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
    </>
  )
);

const App = () => {
  return (
    <ThemeProvider theme={globalTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
