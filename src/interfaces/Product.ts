import { Category } from './Category';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
}

interface ProductWithQuantity extends Product {
  quantity: number;
}

export type { Product, ProductWithQuantity };
