import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {shallow} from 'enzyme';

import {ResetPasswordConnected, ResetPasswordUnwrapped} from './ResetPassword';
import {findByTestAttribute, storeFactory} from '../../testUtils';

test('renders without error', () => {
  const wrapper = shallow(
    <BrowserRouter>
      <ResetPasswordUnwrapped />
    </BrowserRouter>
  ).dive().dive().dive();
  const resetPasswordComponent = findByTestAttribute(wrapper, 'component-reset-password');

  expect(resetPasswordComponent.length).toBe(1);
});

describe('component gets all of the props', () => {
  let setup;
  beforeEach(() => {
    setup = (initialState = {}) => {
      const store = storeFactory(initialState);
      return shallow(
        <BrowserRouter>
          <ResetPasswordConnected store={store} />
        </BrowserRouter>
      ).dive().dive().dive().dive();
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

  test('component gets resetPasswordSuccess piece of state', () => {
    const auth = {
      resetPasswordSuccess: true,
    };
    const wrapper = setup({auth});
    const resetPasswordSuccessProp = wrapper.prop('resetPasswordSuccess');

    expect(resetPasswordSuccessProp).toEqual(auth.resetPasswordSuccess);
  });

  test('resetPassword, is an action creator passed to ResetPassword as prop', () => {
    const wrapper = setup();
    const resetPasswordProp = wrapper.prop('resetPassword');

    expect(resetPasswordProp).toBeInstanceOf(Function);
  });

  test('resetPasswordEnd is an action creator passed to ResetPassword as prop', () => {
    const wrapper = setup();
    const resetPasswordEndProp = wrapper.prop('resetPasswordEnd');

    expect(resetPasswordEndProp).toBeInstanceOf(Function);
  });

  test('resetPasswordFail is an action creator passed to ResetPassword as prop', () => {
    const wrapper = setup();
    const resetPasswordFailProp = wrapper.prop('resetPasswordFail');

    expect(resetPasswordFailProp).toBeInstanceOf(Function);
  });
});