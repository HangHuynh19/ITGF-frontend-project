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

interface ProductInput {
  id?: number;
  title: string;
  price: number;
  description: string;
  images: File[] | string[];
}

export type { Product, ProductWithQuantity, ProductInput };
