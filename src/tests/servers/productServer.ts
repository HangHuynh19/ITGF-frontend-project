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
import { categories } from '../data/categories';

const graphqlURL = graphql.link(instance1.getUri());

const handlers = [
  graphqlURL.query('getAllProductsQuery', (req, res, ctx) => {
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
