import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../interfaces/Product';
import { getProductById } from '../graphql/apiCalls';
import ProductDetail from '../components/ProductDetail';

const ProductDetailPage = () => {
  const id = parseInt(useParams<{ id: string }>().id as string);
  console.log('id', id);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setProduct(await getProductById(id));
    };
    fetchProduct();
  }, [id]);
  console.log('product', product);
  
  return <>{product && <ProductDetail product={product} />}</>;
};

export default ProductDetailPage;
