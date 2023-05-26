import { graphql } from 'msw';
import { setupServer } from 'msw/node';

import { instance1 } from '../../axiosConfig';

const grapqlURL = graphql.link(instance1.getUri());
const handlers = [
  grapqlURL.mutation('postUserQuery', (req, res, ctx) => {
    const { name, email, avatar } = req.variables;
    return res(
      ctx.data({
        addUser: {
          id: 4,
          name: name,
          email: email,
          avatar: avatar,
        },
      })
    );
  }),
];

const userServer = setupServer(...handlers);

export default userServer;
