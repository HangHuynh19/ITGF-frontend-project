import { graphql } from 'msw';
import { setupServer } from 'msw/node';

import { instance1 } from '../../axiosConfig';
import { categories } from '../data/categories';

const graphqlURL = graphql.link(instance1.getUri());
const handlers = [
  graphqlURL.query('getAllCategoriesQuery', (req, res, ctx) => {
    return res(
      ctx.data({
        categories: categories,
      })
    );
  }),
];

const categoryServer = setupServer(...handlers);

export default categoryServer;
