import {
  authenticate,
  logout,
} from '../../store/reducers/authReducer';
import { user1 } from '../data/users';
import authServer from '../servers/authServer';
import store from '../shared/store';

beforeAll(() => {
  authServer.listen({
    onUnhandledRequest: 'warn',
  });
});

afterEach(() => {
  authServer.resetHandlers();
});

afterAll(() => {
  authServer.close();
});

describe('Test authReducer', () => {
  test('Should return initial state', () => {
    expect(store.getState().authReducer).toEqual({
      isLoggedIn: false,
      isLoading: false,
      error: null,
    });
  });

  test('Should authenticate user', async () => {
    await store.dispatch(
      authenticate({
        email: user1.email,
        password: user1.password as string,
      })
    );
    expect(store.getState().authReducer.isLoggedIn).toBe(true);
  });

  test('Should not authenticate user with wrong password', async () => {
    await store.dispatch(
      authenticate({
        email: user1.email,
        password: 'wrong password',
      })
    );
    expect(store.getState().authReducer.isLoggedIn).toBe(false);
  });

  test('Should not authenticate user with wrong email', async () => {
    await store.dispatch(
      authenticate({
        email: 'wrong email',
        password: user1.password as string,
      })
    );
    expect(store.getState().authReducer.isLoggedIn).toBe(false);
  });

  test('Should logout user', async () => {
    store.dispatch(logout());
    expect(store.getState().authReducer.isLoggedIn).toBe(false);
  });
});
