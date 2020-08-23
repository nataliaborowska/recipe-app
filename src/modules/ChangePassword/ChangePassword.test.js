import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {shallow} from 'enzyme';
import {findByTestAttribute, storeFactory} from '../../testUtils';

import {ChangePasswordUnwrapped, ChangePasswordConnected} from './ChangePassword';

test('renders without error', () => {
  const setup = (initialState = {}) => {
    const store = storeFactory(initialState);
    const wrapper = shallow(
      <BrowserRouter>
        <ChangePasswordUnwrapped store={store} />
      </BrowserRouter>
    ).dive().dive().dive();

    return wrapper;
  }

  const wrapper = setup();
  const changePasswordComponent = findByTestAttribute(wrapper, 'component-change-password');

  expect(changePasswordComponent.length).toBe(1);
});

describe('component gets all of the props from redux store', () => {
  let setup;
  beforeEach(() => {
    setup = (initialState = {}) => {
      const store = storeFactory(initialState);
      const wrapper = shallow(
        <BrowserRouter>
          <ChangePasswordConnected store={store} />
        </BrowserRouter>
      ).dive().dive().dive().dive();

      return wrapper;
    }
  });

  test('component gets authenticatedUser piece of state', () => {
    const auth = {
      authenticatedUser: {
        email: 'test@gmail.com',
        userId: 'testUserId',
        username: 'testUsername',
      }
    }

    const wrapper = setup({auth});
    const authenticatedUserProp = wrapper.prop('authenticatedUser');

    expect(authenticatedUserProp).toEqual(auth.authenticatedUser);
  });

  test('component gets authError piece of state', () => {
    const auth = {
      authError: 'test auth error',
    }

    const wrapper = setup({auth});
    const authenticationErrorProp = wrapper.prop('authenticationError');

    expect(authenticationErrorProp).toEqual(auth.authError);
  });

  test('component gets changePasswordSuccess piece of state', () => {
    const auth = {
      changePasswordSuccess: true,
    };
    const wrapper = setup({auth});
    const changePasswordSuccessProp = wrapper.prop('changePasswordSuccess');

    expect(changePasswordSuccessProp).toEqual(auth.changePasswordSuccess);
  });

  test('changePassword is an action creator passed to ChangePassword as prop', () => {
    const wrapper = setup();
    const changePasswordProp = wrapper.prop('changePassword');

    expect(changePasswordProp).toBeInstanceOf(Function);
  });

  test('changePasswordEnd is an action creator passed to ChangePassword as prop', () => {
    const wrapper = setup();
    const changePasswordEndProp = wrapper.prop('changePasswordEnd');

    expect(changePasswordEndProp).toBeInstanceOf(Function);
  });

  test('changePasswordFail is an action creator passed to ChangePassword as prop', () => {
    const wrapper = setup();
    const changePasswordFailProp = wrapper.prop('changePasswordFail');

    expect(changePasswordFailProp).toBeInstanceOf(Function);
  });
});