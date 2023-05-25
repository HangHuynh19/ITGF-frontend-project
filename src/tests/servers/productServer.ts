import { instance1, instance2 } from '../../../src/axiosConfig';

import { graphql, rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  product1,
  product2,
  product3,
  product4,
  product5,
} from '../data/products';
import { categories, electronics } from '../data/categories';

/* const productServer = setupServer(
  rest.post(instance1.getUri(), async (req, res, ctx) => {
    const query = await req.text();
    const getProductByIdOperation = query.includes('product');
    const getAllProductsOperation = query.includes('products');
    const postProductOperation = query.includes('addProduct');
    const putProductOperation = query.includes('updateProduct');

    if (postProductOperation) {
      return res(
        ctx.json({
          data: {
            addProduct: {
              id: 6,
              title: 'Test product',
              price: 100,
              description: 'Test description',
              category: electronics,
              images: ['https://picsum.photos/200/300'],
            },
          },
        })
      );
    }

    if (putProductOperation) {
      return res(
        ctx.json({
          data: {
            updateProduct: {
              id: 1,
              title: 'Test product 1',
              description: 'Test description 1',
              price: 100,
              category: electronics,
              images: ['https://picsum.photos/200/300'],
            },
          },
        })
      );
    }

    if (getAllProductsOperation) {
      return res(
        ctx.json({
          data: {
            products: [product1, product2, product3, product4, product5],
          },
        })
      );
    }

    if (getProductByIdOperation) {
      return res(
        ctx.json({
          data: {
            product: product1,
          },
        })
      );
    }

    if (postProductOperation) {
      return res(
        ctx.json({
          data: {
            addProduct: {
              id: 6,
              title: 'Test product',
              price: 100,
              description: 'Test description',
              category: electronics,
              images: ['https://picsum.photos/200/300'],
            },
          },
        })
      );
    }

    return res(ctx.status(500), ctx.json({ error: 'Unhandled request' }));
  })
);

export default productServer;
 */

const graphqlURL = graphql.link(instance1.getUri());

const handlers = [
  graphqlURL.query('getAllProductsQuery', (req, res, ctx) => {
    console.log('req', req.text());
    return res(
      ctx.data({
        products: [product1, product2, product3, product4, product5],
      })
    );
  }),
  graphqlURL.query('getProductByIdQuery', (req, res, ctx) => {
    return res(
      ctx.data({
        product: product1,
      })
    );
  }),
  graphqlURL.mutation('postProductQuery', (req, res, ctx) => {
    const { title, description, price, categoryId, images } = req.variables;
    const category = categories.find((category) => category.id === categoryId);

    if (!title) {
      return res(
        ctx.errors([
          {
            message: 'Title is required',
          },
        ])
      );
    }

    if (!description) {
      return res(
        ctx.errors([
          {
            message: 'Description is required',
          },
        ])
      );
    }

    if (!price) {
      return res(
        ctx.errors([
          {
            message: 'Price is required',
          },
        ])
      );
    }

    if (price <= 0) {
      return res(
        ctx.errors([
          {
            message: 'Price must be greater than 0',
          },
        ])
      );
    }

    if (!categoryId) {
      return res(
        ctx.errors([
          {
            message: 'Category is required',
          },
        ])
      );
    }

    return res(
      ctx.data({
        addProduct: {
          id: 6,
          title: title,
          price: price,
          description: description,
          category: category,
          images: images,
        },
      })
    );
  }),
  graphqlURL.mutation('putProductQuery', (req, res, ctx) => {
    const { id, title, description, price, images } = req.variables;
    const products = [product1, product2, product3, product4, product5];
    const oldProduct = products.find((product) => product.id === id);

    if (!id) {
      return res(
        ctx.errors([
          {
            message: 'Id is required',
          },
        ])
      );
    }

    if (!oldProduct) {
      return res(
        ctx.errors([
          {
            message: 'Product not found',
          },
        ])
      );
    }

    return res(
      ctx.data({
        updateProduct: {
          id: id,
          title: title,
          description: description,
          price: price,
          category: oldProduct.category,
          images: images,
        },
      })
    );
  }),
  graphqlURL.mutation('deleteProductQuery', (req, res, ctx) => {
    const { id } = req.variables;

    if (!id) {
      return res(
        ctx.errors([
          {
            message: 'Id is required',
          },
        ])
      );
    }

    return res(
      ctx.data({
        deleteProduct: true,
      })
    );
  }),
];

const productServer = setupServer(...handlers);

export default productServer;
