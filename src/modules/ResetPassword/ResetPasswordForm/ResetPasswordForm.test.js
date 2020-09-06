import React from 'react';
import {shallow} from 'enzyme';

import {ResetPasswordForm} from './ResetPasswordForm';
import {findByTestAttribute} from '../../../testUtils';

describe('component and all of the input fields render correctly', () => {
  const wrapper = shallow(<ResetPasswordForm />);
  test('component renders without error', () => {
    const resetPasswordFormComponent = findByTestAttribute(wrapper, 'component-reset-password-form');

    expect(resetPasswordFormComponent.length).toBe(1);
  });

  test('email input field renders', () => {
    const emailInputField = findByTestAttribute(wrapper, 'reset-password-email');

    expect(emailInputField.length).toBe(1);
  });

  test('submit button renders', () => {
    const submitButton = findByTestAttribute(wrapper, 'reset-password-submit');

    expect(submitButton.length).toBe(1);
  });
});

