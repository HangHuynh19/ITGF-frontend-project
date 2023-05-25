import {
  clearUser,
  fetchUserByAccessToken,
  updateUser,
} from '../../store/reducers/userReducer';
import { user1 } from '../data/users';
import restServer from '../servers/restServer';
import store from '../shared/store';

beforeAll(() => {
  restServer.listen({
    onUnhandledRequest: 'warn',
  });
});

afterEach(() => {
  restServer.resetHandlers();
  store.dispatch(clearUser());
});

afterAll(() => {
  restServer.close();
});

describe('Test userReducerUsingRest', () => {
  test('Should update user', async () => {
    await store.dispatch(
      updateUser({
        id: 1,
        user: {
          name: 'John Doe',
        },
      })
    );
    expect(store.getState().userReducer.user).toEqual({
      id: 1,
      name: 'John Doe',
      email: user1.email,
      avatar: user1.avatar,
    });
  });

  test('Should get user by access token', async () => {
    const localStorageMock = {
      getItem: jest.fn(),
    };
    localStorageMock.getItem.mockReturnValue('mock-token');
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });

    await store.dispatch(fetchUserByAccessToken());
    expect(store.getState().userReducer.user).toEqual({
      id: 1,
      name: 'Jhon',
      email: user1.email,
      avatar: user1.avatar,
    });
  });
});
