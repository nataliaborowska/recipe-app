import React from 'react';
import {shallow} from 'enzyme';

import {ChangePasswordForm} from './ChangePasswordForm';
import {findByTestAttribute} from '../../../testUtils';

describe('ChangePasswordForm and all of the inputs render without error', () => {
  const wrapper = shallow(<ChangePasswordForm />);

  test('change password form renders without error', () => {
    const changePasswordFormComponent = findByTestAttribute(wrapper, 'component-change-password-form');

    expect(changePasswordFormComponent.length).toBe(1);
  });

  test('newPassword form input renders without error', () => {
    const changePasswordNew = findByTestAttribute(wrapper, 'change-password-new');

    expect(changePasswordNew.length).toBe(1);
  });

  test('changePasswordConfirm renders without error', () => {
    const changePasswordConfirm = findByTestAttribute(wrapper, 'change-password-confirm');

    expect(changePasswordConfirm.length).toBe(1);
  });

  test('changePassword submit button renders without error', () => {
    const changePasswordSubmit = findByTestAttribute(wrapper, 'change-password-submit');

    expect(changePasswordSubmit.length).toBe(1);
  });
});