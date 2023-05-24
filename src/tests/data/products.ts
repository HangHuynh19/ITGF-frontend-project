import { Product } from '../../interfaces/Product';
import { clothes, electronics, furniture, others, shoes } from './categories';

const product1: Product = {
  id: 1,
  title: 'Refined Rubber Pizza',
  price: 476,
  description:
    'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J',
  images: [
    'https://picsum.photos/640/640?r=8123',
    'https://picsum.photos/640/640?r=1079',
    'https://picsum.photos/640/640?r=3681',
  ],
  category: clothes,
};

const product2: Product = {
  id: 2,
  title: 'Oriental Cotton Soap',
  price: 928,
  description:
    'The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design',
  images: [
    'https://picsum.photos/640/640?r=6509',
    'https://picsum.photos/640/640?r=359',
    'https://picsum.photos/640/640?r=37',
  ],
  category: electronics,
};

const product3: Product = {
  id: 3,
  title: 'Fantastic Soft Mouse',
  price: 291,
  description: 'The Football Is Good For Training And Recreational Purposes',
  images: [
    'https://picsum.photos/640/640?r=4344',
    'https://picsum.photos/640/640?r=5133',
    'https://picsum.photos/640/640?r=3266',
  ],
  category: furniture,
};

const product4: Product = {
  id: 4,
  title: 'Modern Rubber Bacon',
  price: 392,
  description:
    'The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality',
  images: [
    'https://picsum.photos/640/640?r=3260',
    'https://picsum.photos/640/640?r=1361',
    'https://picsum.photos/640/640?r=4466',
  ],
  category: shoes,
};

const product5: Product = {
  id: 5,
  title: 'Bespoke Frozen Pants',
  price: 804,
  description:
    'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J',
  images: [
    'https://picsum.photos/640/640?r=2836',
    'https://picsum.photos/640/640?r=4115',
    'https://picsum.photos/640/640?r=9193',
  ],
  category: others,
};

export { product1, product2, product3, product4, product5 };
