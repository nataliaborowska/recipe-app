import {ActionType} from '../actions/actionTypes';
import {ActionTypesEnum} from '../actions/typesEnum';

const initialState = {
  authenticatedUser: null,
  authIsLoading: false,
  authError: undefined,
  isAuthenticated: false,
  passwordRemindLinkSent: false,
}

export const authReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case ActionTypesEnum.ChangePasswordStart:
      return {
        ...state,
        authIsLoading: true,
        authError: null,
      }
    case ActionTypesEnum.ChangePasswordFail:
      return {
        ...state,
        authIsLoading: false,
        authError: action.changePasswordError,
      }
    case ActionTypesEnum.ChangePasswordSuccess:
      return {
        ...state,
        authIsLoading: false,
      }
    case ActionTypesEnum.PasswordRemindFail:
      return {
        ...state,
        authError: action.passwordRemindError,
      }
    case ActionTypesEnum.PasswordRemindSuccess:
      return {
        ...state,
        passwordRemindLinkSent: action.passwordRemindLinkSent,
      }
    case ActionTypesEnum.SignInStart:
      return {
        ...state,
        authIsLoading: true,
        authError: null,
        authenticatedUser: null,
      }
    case ActionTypesEnum.SignInFail:
      return {
        ...state,
        authIsLoading: false,
        authError: action.signInError,
      }
    case ActionTypesEnum.SignInSuccess:
      return {
        ...state,
        authIsLoading: false,
        isAuthenticated: true,
        authenticatedUser: action.authenticatedUser,
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
    case ActionTypesEnum.SignUpStart:
      return {
        ...state,
        authIsLoading: true,
        authError: null,
        authenticatedUser: null,
      }
    case ActionTypesEnum.SignUpFail:
      return {
        ...state,
        authIsLoading: false,
        authError: action.signUpError,
      }
    case ActionTypesEnum.SignUpSuccess:
      return {
        ...state,
        authIsLoading: false,
        isAuthenticated: true,
        authenticatedUser: action.authenticatedUser,
      }
    default:
      return state;
  }
}