import { createUser } from '../../store/reducers/userReducer';
import userServer from '../servers/userServer';
import store from '../shared/store';

beforeAll(() => {
  userServer.listen({
    onUnhandledRequest: 'warn',
  });
});

afterEach(() => {
  userServer.resetHandlers();
});

afterAll(() => {
  userServer.close();
});

describe('Test userReducer', () => {
  test('Should return initial state', () => {
    expect(store.getState().userReducer).toEqual({
      user: null,
      loading: false,
      error: null,
    });
  });

  test('Should create user', async () => {
    await store.dispatch(
      createUser({
        name: 'test',
        email: 'test@mail.com',
        password: '1234',
        avatar: '',
      })
    );
    expect(store.getState().userReducer.user).toEqual({
      id: 4,
      name: 'test',
      email: 'test@mail.com',
      avatar: '',
    });
  });
});
