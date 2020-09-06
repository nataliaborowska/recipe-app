import React from 'react';
import {shallow} from 'enzyme';

import {SignUpForm} from './SignUpForm';
import {findByTestAttribute} from '../../../testUtils';

test('renders without error', () => {
  const wrapper = shallow(<SignUpForm />);
  const signUpFormComponent = findByTestAttribute(wrapper, 'component-sign-up-form');

  expect(signUpFormComponent.length).toBe(1);
});