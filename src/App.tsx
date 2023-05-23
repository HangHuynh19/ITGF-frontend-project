import React from 'react';
import HomePage from './pages/HomePage';
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import ProductDetailPage from './pages/ProductDetailPage';
import MenuAndFilter from './pages/MenuAndFilter';
import SearchPage from './pages/SearchPage';
import CartPage from './pages/CartPage';
import { ThemeProvider } from '@mui/material/styles';
import globalTheme from './theme/globalTheme';
import ProfilePage from './pages/ProfilePage';
import useAppSelector from './hooks/useAppSelector';
import Root from './pages/Root';

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

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Root />}>
        <Route path='/' element={<MenuAndFilter />}>
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
      </Route>
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
