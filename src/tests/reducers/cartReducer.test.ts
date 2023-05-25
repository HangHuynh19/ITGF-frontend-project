import store from '../shared/store';
import {
  addToCart,
  clearCart,
  deleteFromCart,
  reduceQuantity,
  updateCartWhenProductDeleted,
  updateCartWhenProductUpdated,
} from '../../store/reducers/cartReducer';
import { product1, product2 } from '../data/products';
import { clothes } from '../data/categories';

afterEach(() => {
  store.dispatch(clearCart());
});

describe('Test cartReducer', () => {
  test('Should return initial state', () => {
    expect(store.getState().cartReducer).toEqual({
      cart: [],
      totalPrice: 0,
      totalQuantity: 0,
      loading: false,
      error: null,
    });
  });

  test('Should add product to cart', () => {
    store.dispatch(addToCart(product1));
    expect(store.getState().cartReducer.cart).toEqual([
      { ...product1, quantity: 1 },
    ]);
  });

  test('Should add product to cart and increase quantity', () => {
    store.dispatch(addToCart(product1));
    store.dispatch(addToCart(product1));
    expect(store.getState().cartReducer.cart).toEqual([
      { ...product1, quantity: 2 },
    ]);
  });

  test('Should reduce quantity of product in cart', () => {
    store.dispatch(addToCart(product1));
    store.dispatch(addToCart(product1));
    expect(store.getState().cartReducer.cart).toEqual([
      { ...product1, quantity: 2 },
    ]);
    store.dispatch(reduceQuantity(1));
    expect(store.getState().cartReducer.cart).toEqual([
      { ...product1, quantity: 1 },
    ]);
  });

  test('Should remove a product from cart if its quantity is 0', () => {
    store.dispatch(addToCart(product1));
    store.dispatch(reduceQuantity(1));
    expect(store.getState().cartReducer.cart).toEqual([]);
  });

  test('Should update cart when a product is modified', () => {
    const product = {
      id: 1,
      title: 'Refined Rubber Pizza',
      price: 200,
      description:
        'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J',
      images: [
        'https://picsum.photos/640/640?r=8123',
        'https://picsum.photos/640/640?r=1079',
        'https://picsum.photos/640/640?r=3681',
      ],
      category: clothes,
    };

    store.dispatch(addToCart(product1));
    store.dispatch(
      updateCartWhenProductUpdated({
        id: 1,
        product: product,
      })
    );
    expect(store.getState().cartReducer.totalPrice).toBe(200);
    expect(store.getState().cartReducer.totalQuantity).toBe(1);
  });

  test('Should update cart when a product is deleted', () => {
    store.dispatch(addToCart(product1));
    store.dispatch(updateCartWhenProductDeleted(1));
    expect(store.getState().cartReducer.cart).toEqual([]);
    expect(store.getState().cartReducer.totalPrice).toBe(0);
    expect(store.getState().cartReducer.totalQuantity).toBe(0);
  });

  test('Should drop a product from cart', () => {
    store.dispatch(addToCart(product1));
    store.dispatch(addToCart(product2));
    store.dispatch(deleteFromCart(1));
    expect(store.getState().cartReducer.cart).toEqual([
      { ...product2, quantity: 1 },
    ]);
    expect(store.getState().cartReducer.totalPrice).toBe(928);
    expect(store.getState().cartReducer.totalQuantity).toBe(1);
  });
});
