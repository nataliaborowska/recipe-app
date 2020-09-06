import React from 'react';
import {shallow} from 'enzyme';

import {SignInConnected, SignInUnwrapped} from './SignIn';
import {findByTestAttribute, storeFactory} from '../../testUtils';
import {SignOutButtonUnwrapped} from '../Header/SignOutButton/SignOutButton';

test('component renders without error', () => {
  const wrapper = shallow(<SignInUnwrapped />);
  const signInComponent = findByTestAttribute(wrapper, 'component-sign-in');

  expect(signInComponent.length).toBe(1);
});

describe('components get all of the props', () => {
  let setup;

  beforeEach(() => {
    setup = (initialState = {}) => {
      const store = storeFactory(initialState);

      return shallow(<SignInConnected store={store} />).dive();
    }
  });

  test('component gets authError piece of state', () => {
    const auth = {
      authError: 'some error',
    };
    const wrapper = setup({auth});
    const authenticationErrorProp = wrapper.prop('authenticationError');

    expect(authenticationErrorProp).toEqual(auth.authError);
  });

  test('component gets authIsLoading piece of state', () => {
    const auth = {
      authIsLoading: true,
    };
    const wrapper = setup({auth});
    const authenticationIsLoadingProp = wrapper.prop('authenticationIsLoading');

    expect(authenticationIsLoadingProp).toEqual(auth.authIsLoading);
  });

  test('component gets authIsLoading piece of state', () => {
    const auth = {
      isAuthenticated: true,
    };
    const wrapper = setup({auth});
    const isAuthenticatedProp = wrapper.prop('isAuthenticated');

    expect(isAuthenticatedProp).toEqual(auth.isAuthenticated);
  });

  test('signIn is an action creator passed to SignIn as props', () => {
    const wrapper = setup();
    const signInProp = wrapper.prop('signIn');

    expect(signInProp).toBeInstanceOf(Function);
  });
});
