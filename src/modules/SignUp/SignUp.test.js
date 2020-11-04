import React from 'react';
import {shallow} from 'enzyme';

import {SignUpConnected, SignUpUnwrapped} from './SignUp';
import {findByTestAttribute, storeFactory} from '../../testUtils';

test('component renders without error', () => {

  const auth = {
    isAuthenticated: false,
  }
  const store = storeFactory({auth});

  const wrapper = shallow(<SignUpConnected store={store} />).dive().dive();

  const signUpComponent = findByTestAttribute(wrapper, 'component-sign-up');

  expect(signUpComponent.length).toBe(1);
});

describe('components get all of the props', () => {
  let setup;

  beforeEach(() => {
    setup = (initialState = {}) => {
      const store = storeFactory(initialState);

      return shallow(<SignUpConnected store={store} />).dive();
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

  test('component gets isAuthenticated piece of state', () => {
    const auth = {
      isAuthenticated: true,
    };
    const wrapper = setup({auth});
    const isAuthenticatedProp = wrapper.prop('isAuthenticated');

    expect(isAuthenticatedProp).toEqual(auth.isAuthenticated);
  });

  test('signUp is an action creator passed to SignUp as props', () => {
    const wrapper = setup();
    const signUpProp = wrapper.prop('signUp');

    expect(signUpProp).toBeInstanceOf(Function);
  });
});
