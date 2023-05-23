import { Category } from '../../../interfaces/Category';

const clothes: Category = {
  id: 1,
  name: 'Clothes',
  image: 'https://picsum.photos/640/640?r=5890',
};

const electronics: Category = {
  id: 2,
  name: 'Electronics',
  image: 'https://picsum.photos/640/640?r=8663',
};

const furniture: Category = {
  id: 3,
  name: 'Furniture',
  image: 'https://picsum.photos/640/640?r=9823',
};

const shoes: Category = {
  id: 4,
  name: 'Shoes',
  image: 'https://picsum.photos/640/640?r=7731',
};

const others: Category = {
  id: 5,
  name: 'Others',
  image: 'https://picsum.photos/640/640?r=3613',
};

const categories: Category[] = [clothes, electronics, furniture, shoes, others];

export { clothes, electronics, furniture, shoes, others, categories };
