import firebase from 'firebase';

import {AuthActionType} from '../actions/authActions/actionTypes';
import {AuthActionTypesEnum} from '../actions/authActions/typesEnum';

export interface IAuthState {
  authenticatedUser: null | firebase.auth.UserCredential;
  authError: null | string;
  authIsLoading: boolean;
  changePasswordSuccess: boolean;
  fetchingUsers: boolean,
  fetchUsersError: boolean;
  isAuthenticated: boolean;
  resetPasswordSuccess: boolean;
  users: Array<IUser>;
}

export interface IUser {
  email: string;
  userId: string;
  username: string;
}

const initialState: IAuthState = {
  authenticatedUser: null as null | firebase.auth.UserCredential,
  authError: null as null | string,
  authIsLoading: false,
  changePasswordSuccess: false,
  fetchingUsers: false,
  fetchUsersError: false,
  isAuthenticated: false,
  resetPasswordSuccess: false,
  users: [] as Array<IUser>,
}

export const authReducer = (state = initialState, action: AuthActionType): IAuthState => {
  switch (action.type) {
    case AuthActionTypesEnum.FetchUsersFail:
      return {
        ...state,
        fetchingUsers: false,
        fetchUsersError: true,
      }
    case AuthActionTypesEnum.FetchUsersStart:
      return {
        ...state,
        fetchingUsers: true,
        fetchUsersError: false,
      }
    case AuthActionTypesEnum.FetchUsersSuccess:
      return {
        ...state,
        fetchingUsers: false,
        users: action.usersList,
      }
    case AuthActionTypesEnum.ChangePasswordFail:
    case AuthActionTypesEnum.ResetPasswordFail:
    case AuthActionTypesEnum.SignInFail:
    case AuthActionTypesEnum.SignUpFail:
      return {
        ...state,
        authError: action.authError,
        authIsLoading: false,
      }
    case AuthActionTypesEnum.ChangePasswordEnd: {
      return {
        ...state,
        authError: null,
        changePasswordSuccess: false,
      }
    }
    case AuthActionTypesEnum.ChangePasswordStart:
      return {
        ...state,
        authError: null,
        authIsLoading: true,
      }
    case AuthActionTypesEnum.ChangePasswordSuccess:
      return {
        ...state,
        authIsLoading: false,
        changePasswordSuccess: true
      }
    case AuthActionTypesEnum.RemoveUsersListEnd:
      return {
        ...state,
        users: [],
      }
    case AuthActionTypesEnum.ResetPasswordSuccess:
      return {
        ...state,
        authIsLoading: false,
        resetPasswordSuccess: true,
      }
    case AuthActionTypesEnum.ResetPasswordEnd:
      return {
        ...state,
        authError: null,
        resetPasswordSuccess: false,
      }
    case AuthActionTypesEnum.SignInStart:
    case AuthActionTypesEnum.SignUpStart:
      return {
        ...state,
        authenticatedUser: null,
        authError: null,
        authIsLoading: true,
      }
    case AuthActionTypesEnum.SignInSuccess:
    case AuthActionTypesEnum.SignUpSuccess:
      return {
        ...state,
        authenticatedUser: action.authenticatedUser,
        authIsLoading: false,
        isAuthenticated: true,
      }
    case AuthActionTypesEnum.SignOutFail:
      return {
        ...state,
        authError: action.signOutError,
      }
    case AuthActionTypesEnum.SignOutSuccess:
      return {
        ...state,
        authenticatedUser: null,
        isAuthenticated: false,
      }
    default:
      return state;
  }
}