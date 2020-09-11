import {AuthActionTypesEnum} from '../actions/authActions/typesEnum';
import {authReducer} from './authReducer';

describe('authReducer tests', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      authenticatedUser: null,
      authError: null,
      authIsLoading: false,
      changePasswordSuccess: false,
      fetchingUsers: false,
      fetchUsersError: false,
      isAuthenticated: false,
      resetPasswordSuccess: false,
      users: [],
    }
  });

  test('authReducer returns initial state when no action is passed', () => {
    const newState = authReducer(initialState);

    expect(newState).toEqual(initialState);
  });

  test('authReducer returns specific state when action type FETCH_USERS_FAIL is received', () => {
    const state = {
      ...initialState,
      fetchingUsers: false,
      fetchUsersError: true,
    }
    const newState = authReducer(initialState, {type: AuthActionTypesEnum.FETCH_USERS_FAIL});

    expect(newState).toEqual(state);
  });

  test('authReducer returns specific state when action type FETCH_USERS_START is received', () => {
    const state = {
      ...initialState,
      fetchingUsers: true,
      fetchUsersError: false,
    }
    const newState = authReducer(initialState, {type: AuthActionTypesEnum.FETCH_USERS_START});

    expect(newState).toEqual(state);
  });

  test('authReducer returns specific state when action type FETCH_USERS_SUCCESS is received', () => {
    const userList = ['user1', 'user2'];
    const state = {
      ...initialState,
      fetchingUsers: false,
      users: userList,
    }
    const newState = authReducer(initialState, {
      type: AuthActionTypesEnum.FETCH_USERS_SUCCESS,
      usersList: userList,
    });

    expect(newState).toEqual(state);
  });

  describe(`authReducer returns specific state when action type CHANGE_PASSWORD_FAIL or RESET_PASSWORD_FAIL
  or SIGN_IN_FAIL or SIGN_UP_FAIL is received`, () => {
    let authError;
    let state;
    beforeEach(() => {
      authError = 'error message';
      state = {
        ...initialState,
        authError: authError,
        authIsLoading: false,
      }
    });

    test('authReducer returns specific state when action type CHANGE_PASSWORD_FAIL is received', () => {
      const newState = authReducer(initialState, {
        type: AuthActionTypesEnum.CHANGE_PASSWORD_FAIL,
        authError: authError,
      });

      expect(newState).toEqual(state);
    });

    test('authReducer returns specific state when action type RESET_PASSWORD_FAIL is received', () => {
      const newState = authReducer(initialState, {
        type: AuthActionTypesEnum.RESET_PASSWORD_FAIL,
        authError: authError,
      });

      expect(newState).toEqual(state);
    });

    test('authReducer returns specific state when action type SIGN_IN_FAIL is received', () => {
      const newState = authReducer(initialState, {
        type: AuthActionTypesEnum.SIGN_IN_FAIL,
        authError: authError,
      });

      expect(newState).toEqual(state);
    });

    test('authReducer returns specific state when action type SIGN_UP_FAIL is received', () => {
      const newState = authReducer(initialState, {
        type: AuthActionTypesEnum.SIGN_UP_FAIL,
        authError: authError,
      });

      expect(newState).toEqual(state);
    });
  });

  test('authReducer returns specific state when action type CHANGE_PASSWORD_END is received', () => {
    const state = {
      ...initialState,
      authError: null,
      changePasswordSuccess: false,
    }
    const newState = authReducer(initialState, {type: AuthActionTypesEnum.CHANGE_PASSWORD_END});

    expect(newState).toEqual(state);
  });

  test('authReducer returns specific state when action type CHANGE_PASSWORD_START is received', () => {
    const state = {
      ...initialState,
      authError: null,
      authIsLoading: true,
    }
    const newState = authReducer(initialState, {type: AuthActionTypesEnum.CHANGE_PASSWORD_START});

    expect(newState).toEqual(state);
  });

  test('authReducer returns specific state when action type CHANGE_PASSWORD_SUCCESS is received', () => {
    const state = {
      ...initialState,
      authIsLoading: false,
      changePasswordSuccess: true,
    }
    const newState = authReducer(initialState, {type: AuthActionTypesEnum.CHANGE_PASSWORD_SUCCESS});

    expect(newState).toEqual(state);
  });

  test('authReducer returns specific state when action type REMOVE_USERS_LIST_END is received', () => {
    const state = {
      ...initialState,
      users: [],
    }
    const newState = authReducer(initialState, {type: AuthActionTypesEnum.REMOVE_USERS_LIST_END});

    expect(newState).toEqual(state);
  });

  test('authReducer returns specific state when action type RESET_PASSWORD_SUCCESS is received', () => {
    const state = {
      ...initialState,
      authIsLoading: false,
      resetPasswordSuccess: true,
    }
    const newState = authReducer(initialState, {type: AuthActionTypesEnum.RESET_PASSWORD_SUCCESS});

    expect(newState).toEqual(state);
  });

  test('authReducer returns specific state when action type RESET_PASSWORD_END is received', () => {
    const state = {
      ...initialState,
      authError: null,
      resetPasswordSuccess: false,
    }
    const newState = authReducer(initialState, {type: AuthActionTypesEnum.RESET_PASSWORD_END});

    expect(newState).toEqual(state);
  });

  describe('authReducer returns specific state when action type SIGN_IN_START or SIGN_UP_START is received', () => {
    let state;
    beforeEach(() => {
      state = {
        ...initialState,
        authenticatedUser: null,
        authError: null,
        authIsLoading: true,
      }
    });

    test('authReducer returns specific state when action type SIGN_IN_START is received', () => {
      const newState = authReducer(initialState, {type: AuthActionTypesEnum.SIGN_IN_START});

      expect(newState).toEqual(state);
    });

    test('authReducer returns specific state when action type SIGN_UP_START is received', () => {
      const newState = authReducer(initialState, {type: AuthActionTypesEnum.SIGN_UP_START});

      expect(newState).toEqual(state);
    });
  });

  describe('authReducer returns specific state when action type SIGN_IN_SUCCESS or SIGN_UP_SUCCESS is received', () => {
    let state;
    let authenticatedUser;

    beforeEach(() => {
      authenticatedUser = {
        user: {
          displayName: 'userName',
          email: 'email@email.com',
          uid: 'someUserId',
        }
      };

      state = {
        ...initialState,
        authenticatedUser: {
          username: authenticatedUser.user.displayName,
          email: authenticatedUser.user.email,
          userId: authenticatedUser.user.uid,
        },
        authIsLoading: false,
        isAuthenticated: true,
      }
    });

    test('authReducer returns specific state when action type SIGN_IN_SUCCESS is received', () => {
      const newState = authReducer(initialState, {
        type: AuthActionTypesEnum.SIGN_IN_SUCCESS,
        authenticatedUser,
      });

      expect(newState).toEqual(state);
    });

    test('authReducer returns specific state when action type SIGN_UP_SUCCESS is received', () => {
      const newState = authReducer(initialState, {
        type: AuthActionTypesEnum.SIGN_UP_SUCCESS,
        authenticatedUser,
      });

      expect(newState).toEqual(state);
    });
  });

  test('authReducer returns specific state when action type SIGN_OUT_FAIL is received', () => {
    const signOutError = 'error message';
    const state = {
      ...initialState,
      authError: signOutError,
    }
    const newState = authReducer(initialState, {
      type: AuthActionTypesEnum.SIGN_OUT_FAIL,
      signOutError,
    });

    expect(newState).toEqual(state);
  });

  test('authReducer returns specific state when action type SIGN_OUT_SUCCESS is received', () => {
    const signOutError = 'error message';
    const state = {
      ...initialState,
      authenticatedUser: null,
      isAuthenticated: false,
    }
    const newState = authReducer(initialState, {
      type: AuthActionTypesEnum.SIGN_OUT_SUCCESS,
    });

    expect(newState).toEqual(state);
  });
});
