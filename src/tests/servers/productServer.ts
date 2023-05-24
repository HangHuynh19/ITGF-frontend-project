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
import { electronics } from '../data/categories';

const productServer = setupServer(
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
