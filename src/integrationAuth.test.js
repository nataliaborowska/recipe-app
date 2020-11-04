import {storeFactory} from './testUtils';
import {
  changePassword,
  changePasswordEnd,
  changePasswordFail,
  fetchUsersList,
  removeUsersList,
  resetPassword,
  resetPasswordEnd,
  resetPasswordFail,
  saveUserToDatabase,
  signIn,
  signInSuccess,
  signOut,
  signUp
} from './store/actions/authActions/auth';
import {Firebase} from './components/Firebase';

let firebase = new Firebase();

describe('changePassword action dispatcher', () => {
  let store;
  const initialState = {
    auth: {
      authenticatedUser: null,
      authError: null,
      authIsLoading: false,
      changePasswordSuccess: false,
      fetchingUsers: false,
      fetchUsersError: false,
      isAuthenticated: false,
      resetPasswordSuccess: false,
      users: [],
    },
  };

  beforeEach(() => {
    store = storeFactory(initialState);
  });

  // test('updates state correctly on changePassword', () => {
  //   store.dispatch(changePassword('newPassword', firebase));

  //   const newState = store.getState();
  //   const expectedState = {
  //     auth: {
  //       authenticatedUser: null,
  //       authError: null,
  //       authIsLoading: false,
  //       changePasswordSuccess: false,
  //       fetchingUsers: false,
  //       fetchUsersError: false,
  //       isAuthenticated: false,
  //       resetPasswordSuccess: false,
  //       users: [],
  //     },
  //   }

  //   console.warn(newState.auth);
  // });

  test('updates the state correctly on changePasswordEnd', () => {
    store.dispatch(changePasswordEnd());

    const newState = store.getState().auth;
    const expectedState = {
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

    console.warn(newState);

    expect(newState).toEqual(expectedState);
  });
});