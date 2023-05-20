import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import ProductDetail from '../components/ProductDetail';
import useAppDispatch from '../hooks/useAppDispatch';
import { fetchProductById } from '../store/reducers/productReducer';
import useAppSelector from '../hooks/useAppSelector';

const ProductDetailPage = () => {
  const id = parseInt(useParams<{ id: string }>().id as string);
  const dispatch = useAppDispatch();
  const product = useAppSelector(
    (state) => state.productReducer.filteredProducts[0]
  );

  useEffect(() => {
    const fetchProducts = async () => {
      await dispatch(fetchProductById(id));
    };
    fetchProducts();
  }, [dispatch, id]);

  return (
    <>{product ? <ProductDetail product={product} /> : <div>Loading...</div>}</>
  );
};

export default ProductDetailPage;
