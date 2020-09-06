import React from 'react';
import {shallow} from 'enzyme';

import {SignInForm} from './SignInForm';
import {findByTestAttribute} from '../../../testUtils';

test('renders without error', () => {
  const wrapper = shallow(<SignInForm />);
  const signInFormComponent = findByTestAttribute(wrapper, 'component-sign-in-form');

  expect(signInFormComponent.length).toBe(1);
});