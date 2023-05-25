import { graphql } from 'msw';
import { instance1 } from '../../axiosConfig';
import { setupServer } from 'msw/node';
import { users } from '../data/users';

const graphqlURL = graphql.link(instance1.getUri());

const handlers = [
  graphqlURL.mutation('loginQuery', (req, res, ctx) => {
    const { email, password } = req.variables;
    const user = users.find((user) => user.email === email);

    if (!user) {
      return res(
        ctx.errors([
          {
            message: 'User not found',
          },
        ])
      );
    }

    if (user.password !== password) {
      return res(
        ctx.errors([
          {
            message: 'Unauthorized',
          },
        ])
      );
    }

    return res(
      ctx.data({
        login: {
          access_token: '1234',
        },
      })
    );
  }),
];

const authServer = setupServer(...handlers);

export default authServer;
