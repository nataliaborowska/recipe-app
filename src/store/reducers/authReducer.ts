import {ActionType} from '../actions/actionTypes';
import {ActionTypesEnum} from '../actions/typesEnum';

const initialState = {
  authenticatedUser: null,
  authIsLoading: false,
  authError: null,
  isAuthenticated: false,
  resetPasswordSuccess: false,
  changePasswordSuccess: false,
}

export const authReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case ActionTypesEnum.ChangePasswordFail:
    case ActionTypesEnum.ResetPasswordFail:
    case ActionTypesEnum.SignInFail:
    case ActionTypesEnum.SignUpFail:
      return {
        ...state,
        authIsLoading: false,
        authError: action.authError,
      }
    case ActionTypesEnum.ChangePasswordEnd: {
      return {
        ...state,
        authError: null,
        changePasswordSuccess: false,
      }
    }
    case ActionTypesEnum.ChangePasswordStart:
      return {
        ...state,
        authIsLoading: true,
        authError: null,
      }
    case ActionTypesEnum.ChangePasswordSuccess:
      return {
        ...state,
        authIsLoading: false,
        changePasswordSuccess: true
      }
    case ActionTypesEnum.ResetPasswordSuccess:
      return {
        ...state,
        resetPasswordSuccess: true,
      }
    case ActionTypesEnum.ResetPasswordEnd:
      return {
        ...state,
        resetPasswordSuccess: false,
        authError: null,
      }
    case ActionTypesEnum.SignInStart:
    case ActionTypesEnum.SignUpStart:
      return {
        ...state,
        authIsLoading: true,
        authError: null,
        authenticatedUser: null,
      }
    case ActionTypesEnum.SignInSuccess:
    case ActionTypesEnum.SignUpSuccess:
      return {
        ...state,
        authIsLoading: false,
        isAuthenticated: true,
        authenticatedUser: action.authenticatedUser.user,
      }
    case ActionTypesEnum.SignOutFail:
      return {
        ...state,
        isAuthenticated: true,
        authError: action.signOutError,
      }
    case ActionTypesEnum.SignOutSuccess:
      return {
        ...state,
        isAuthenticated: false,
        authenticatedUser: null,
      }
    default:
      return state;
  }
}