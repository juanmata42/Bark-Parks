import reducers from '../reducers';

describe('reducers', () => {
  it('should return the initial state', () => {
    expect(reducers(undefined, {})).toEqual({
      authReducer: {
        authData: null,
      },
      dogspots: {
        dogspots: [],
      },
      groups: {
        groups: [],
      },
      posts: {
        posts: [],
      },
      shelters: {
        shelters: [],
      },
      user: {
        user: {},
      },
      users: {
        users: [],
      },
    });
  });
});
