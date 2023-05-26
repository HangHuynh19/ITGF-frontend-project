import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { instance2 } from '../../axiosConfig';
import { user1 } from '../data/users';

const restServer = setupServer(
  rest.put(`${instance2.getUri()}/users/1`, async (req, res, ctx) => {
    const { name } = await req.json();
    return res(
      ctx.json({
        id: 1,
        name: name,
        email: user1.email,
        avatar: user1.avatar,
      })
    );
  }),

  rest.get(`${instance2.getUri()}/auth/profile`, async (req, res, ctx) => {
    const token = req.headers.get('Authorization')?.split(' ')[1];

    if (!token) {
      return res(
        ctx.json({
          message: 'Not authorized',
        })
      );
    }

    return res(
      ctx.json({
        id: 1,
        name: 'Jhon',
        email: user1.email,
        avatar: user1.avatar,
      })
    );
  })
);

export default restServer;
