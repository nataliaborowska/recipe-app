import firebase from 'firebase';

import {AuthActionType} from '../actions/actionTypes';
import {ActionTypesEnum} from '../actions/typesEnum';

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
    case ActionTypesEnum.FetchUsersFail:
      return {
        ...state,
        fetchingUsers: false,
        fetchUsersError: true,
      }
    case ActionTypesEnum.FetchUsersStart:
      return {
        ...state,
        fetchingUsers: true,
        fetchUsersError: false,
      }
    case ActionTypesEnum.FetchUsersSuccess:
      return {
        ...state,
        fetchingUsers: false,
        users: action.usersList,
      }
    case ActionTypesEnum.ChangePasswordFail:
    case ActionTypesEnum.ResetPasswordFail:
    case ActionTypesEnum.SignInFail:
    case ActionTypesEnum.SignUpFail:
      return {
        ...state,
        authError: action.authError,
        authIsLoading: false,
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
        authError: null,
        authIsLoading: true,
      }
    case ActionTypesEnum.ChangePasswordSuccess:
      return {
        ...state,
        authIsLoading: false,
        changePasswordSuccess: true
      }
    case ActionTypesEnum.RemoveUsersListEnd:
      return {
        ...state,
        users: [],
      }
    case ActionTypesEnum.ResetPasswordSuccess:
      return {
        ...state,
        authIsLoading: false,
        resetPasswordSuccess: true,
      }
    case ActionTypesEnum.ResetPasswordEnd:
      return {
        ...state,
        authError: null,
        resetPasswordSuccess: false,
      }
    case ActionTypesEnum.SignInStart:
    case ActionTypesEnum.SignUpStart:
      return {
        ...state,
        authenticatedUser: null,
        authError: null,
        authIsLoading: true,
      }
    case ActionTypesEnum.SignInSuccess:
    case ActionTypesEnum.SignUpSuccess:
      return {
        ...state,
        authenticatedUser: action.authenticatedUser,
        authIsLoading: false,
        isAuthenticated: true,
      }
    case ActionTypesEnum.SignOutFail:
      return {
        ...state,
        authError: action.signOutError,
      }
    case ActionTypesEnum.SignOutSuccess:
      return {
        ...state,
        authenticatedUser: null,
        isAuthenticated: false,
      }
    default:
      return state;
  }
}