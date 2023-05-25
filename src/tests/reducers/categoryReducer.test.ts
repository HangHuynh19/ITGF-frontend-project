import {fetchAllCategories} from "../../store/reducers/categoryReducer";
import categoryServer from "../servers/categoryServer";
import store from "../shared/store";

beforeAll(() => {
  categoryServer.listen({
    onUnhandledRequest: 'warn',
  });
});

afterEach(() => {
  categoryServer.resetHandlers();
});

afterAll(() => {
  categoryServer.close();
});

describe('Test categoryReducer', () => {
  test('Should return initial state', () => {
    expect(store.getState().categoryReducer).toEqual({
      categories: [],
      loading: false,
      error: null,
    });
  });

  test('Should fetch all categories', async () => {
    await store.dispatch(fetchAllCategories());
    expect(store.getState().categoryReducer.categories.length).toBe(5);
  });
});