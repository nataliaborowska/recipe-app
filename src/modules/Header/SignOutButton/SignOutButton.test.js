import React from 'react';
import {shallow} from 'enzyme';

import {SignOutButtonUnwrapped} from './SignOutButton';
import {findByTestAttribute} from '../../../testUtils';

test('renders without error', () => {
  const wrapper = shallow(<SignOutButtonUnwrapped />);
  const componentSignOutButton = findByTestAttribute(wrapper, 'component-sign-out-button');

  expect(componentSignOutButton.length).toBe(1);
});

test('signOut runs on SignOutButton click', () => {
  const signOutMock = jest.fn();
  const props = {
    isAuthenticated: false,
    signOut: signOutMock,
  }
  const wrapper = shallow(<SignOutButtonUnwrapped {...props} />);
  const signOutButton = findByTestAttribute(wrapper, 'component-sign-out-button');

  signOutButton.simulate('click', {preventDefault() {} });

  const signOutMockCallCount = signOutMock.mock.calls.length;

  expect(signOutMockCallCount).toBe(1);
});