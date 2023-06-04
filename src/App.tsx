import React, { useEffect } from 'react';
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
import CartPage from './pages/CartPage';
import { ThemeProvider } from '@mui/material/styles';
import globalTheme from './theme/globalTheme';
import ProfilePage from './pages/ProfilePage';
import useAppSelector from './hooks/useAppSelector';
import Root from './pages/Root';
import useAppDispatch from './hooks/useAppDispatch';
import { fetchUserByAccessToken } from './store/reducers/userReducer';
import {fetchProductById} from './store/reducers/productReducer';
import {updateCartWhenProductDeleted, updateCartWhenProductUpdated} from './store/reducers/cartReducer';
import {Product} from './interfaces/Product';

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
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cartReducer.cart);

  useEffect(() => {
    const fetchUser = async () => {
      await dispatch(fetchUserByAccessToken());
    };
    fetchUser();
  }, [dispatch]);

  useEffect(() => {
    cart.map(async (item) => {
      const existedItem = await dispatch(fetchProductById(item.id));
      if (!existedItem) {
        dispatch(updateCartWhenProductDeleted(item.id));
        return;
      }

      dispatch(updateCartWhenProductUpdated({
        id: item.id,
        product: item as Product,
      }));
    });
  }, [cart, dispatch]);

  return (
    <ThemeProvider theme={globalTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
