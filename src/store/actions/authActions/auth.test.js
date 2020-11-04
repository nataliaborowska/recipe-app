import {AuthActionTypesEnum} from './typesEnum';
import {
  changePasswordEnd,
  changePasswordFail,
  resetPasswordEnd,
  resetPasswordFail,
  signInSuccess,
} from './auth';

describe('auth action creators', () => {
  test('returns action with type CHANGE_PASSWORD_END', () => {
    const action = changePasswordEnd();

    expect(action).toEqual({
      type: AuthActionTypesEnum.CHANGE_PASSWORD_END,
    });
  });

  test('returns action with type CHANGE_PASSWORD_FAIL', () => {
    const authError = 'some error';
    const action = changePasswordFail(authError);

    expect(action).toEqual({
      type: AuthActionTypesEnum.CHANGE_PASSWORD_FAIL,
      authError: authError,
    });
  });

  test('returns action with type RESET_PASSWORD_END', () => {
    const action = resetPasswordEnd();

    expect(action).toEqual({
      type: AuthActionTypesEnum.RESET_PASSWORD_END,
    });
  });

  test('returns action with type RESET_PASSWORD_END', () => {
    const authError = 'some error';
    const action = resetPasswordFail(authError);

    expect(action).toEqual({
      type: AuthActionTypesEnum.RESET_PASSWORD_FAIL,
      authError: authError,
    });
  });

  test('returns action with type SIGN_IN_SUCCESS', () => {
    const authenticatedUser = {
      name: 'test',
      password: 'test',
    }
    const action = signInSuccess(authenticatedUser);

    expect(action).toEqual({
      type: AuthActionTypesEnum.SIGN_IN_SUCCESS,
      authenticatedUser: authenticatedUser,
    });
  });
});