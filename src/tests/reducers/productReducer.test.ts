import store from '../shared/store';
import productServer from '../servers/productServer';
import {
  cleanUpProductReducer,
  createProduct,
  fetchAllProducts,
  fetchProductById,
  updateProduct,
} from '../../store/reducers/productReducer';
import {
  product1,
  product2,
  product3,
  product4,
  product5,
} from '../data/products';
import { electronics } from '../data/categories';

beforeAll(() => {
  productServer.listen();
});

afterEach(() => {
  productServer.resetHandlers();
  store.dispatch(cleanUpProductReducer());
});

afterAll(() => {
  productServer.close();
});

describe('Test productReducer', () => {
  test('Should return initial state', () => {
    expect(store.getState().productReducer).toEqual({
      products: [],
      filteredProducts: [],
      loading: false,
      error: null,
    });
  });

  test('Should fetch all products', async () => {
    await store.dispatch(fetchAllProducts());
    expect(store.getState().productReducer.products.length).toBe(5);
  });

  test('Should fetch and sort products by price from lowest to highest', async () => {
    await store.dispatch(fetchAllProducts('Price | lowest to highest'));
    expect(store.getState().productReducer.products).toEqual([
      product3,
      product4,
      product1,
      product5,
      product2,
    ]);
  });

  test('Should fetch and sort products by price from highest to lowest', async () => {
    await store.dispatch(fetchAllProducts('Price | highest to lowest'));
    expect(store.getState().productReducer.products).toEqual([
      product2,
      product5,
      product1,
      product4,
      product3,
    ]);
  });

  test('Should fetch product by id', async () => {
    await store.dispatch(fetchProductById(1));
    expect(store.getState().productReducer.filteredProducts).toEqual([
      product1,
    ]);
  });

  test('Should post a new product', async () => {
    await store.dispatch(fetchAllProducts());
    await store.dispatch(
      createProduct({
        title: 'Test product',
        description: 'Test description',
        price: 100,
        categoryId: 2,
        images: [''],
      })
    );

    expect(store.getState().productReducer.products.length).toBe(6);
  });

  test('Should update product', async () => {
    await store.dispatch(fetchAllProducts());
    await store.dispatch(
      updateProduct({
        id: 1,
        product: {
          title: 'Test product 1',
          description: 'Test description 1',
          price: 100,
          categoryId: 2,
          images: ['https://picsum.photos/200/300'],
        },
      })
    );
    console.log(store.getState().productReducer.products);
    expect(store.getState().productReducer.products[0]).toEqual({
      id: 1,
      title: 'Test product 1',
      description: 'Test description 1',
      price: 100,
      category: electronics,
      images: ['https://picsum.photos/200/300'],
    });
  });
});
