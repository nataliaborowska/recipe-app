import firebase from 'firebase';

import {AuthActionType} from '../actions/authActions/actionTypes';
import {AuthActionTypesEnum} from '../actions/authActions/typesEnum';

export interface IAuthState {
  authenticatedUser: null | IUser;
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
  email?: string | null;
  userId?: string;
  username?: string | null;
}

const initialState: IAuthState = {
  authenticatedUser: null as null | IUser,
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
    case AuthActionTypesEnum.FETCH_USERS_FAIL:
      return {
        ...state,
        fetchingUsers: false,
        fetchUsersError: true,
      }
    case AuthActionTypesEnum.FETCH_USERS_START:
      return {
        ...state,
        fetchingUsers: true,
        fetchUsersError: false,
      }
    case AuthActionTypesEnum.FETCH_USERS_SUCCESS:
      return {
        ...state,
        fetchingUsers: false,
        users: action.usersList,
      }
    case AuthActionTypesEnum.CHANGE_PASSWORD_FAIL:
    case AuthActionTypesEnum.RESET_PASSWORD_FAIL:
    case AuthActionTypesEnum.SIGN_IN_FAIL:
    case AuthActionTypesEnum.SIGN_UP_FAIL:
      return {
        ...state,
        authError: action.authError,
        authIsLoading: false,
      }
    case AuthActionTypesEnum.CHANGE_PASSWORD_END: {
      return {
        ...state,
        authError: null,
        changePasswordSuccess: false,
      }
    }
    case AuthActionTypesEnum.CHANGE_PASSWORD_START:
      return {
        ...state,
        authError: null,
        authIsLoading: true,
      }
    case AuthActionTypesEnum.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        authIsLoading: false,
        changePasswordSuccess: true
      }
    case AuthActionTypesEnum.REMOVE_USERS_LIST_END:
      return {
        ...state,
        users: [],
      }
    case AuthActionTypesEnum.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        authIsLoading: false,
        resetPasswordSuccess: true,
      }
    case AuthActionTypesEnum.RESET_PASSWORD_END:
      return {
        ...state,
        authError: null,
        resetPasswordSuccess: false,
      }
    case AuthActionTypesEnum.SIGN_IN_START:
    case AuthActionTypesEnum.SIGN_UP_START:
      return {
        ...state,
        authenticatedUser: null,
        authError: null,
        authIsLoading: true,
      }
    case AuthActionTypesEnum.SIGN_IN_SUCCESS:
    case AuthActionTypesEnum.SIGN_UP_SUCCESS:
      const user = action.authenticatedUser.user;
      const userInfo = {
        username: user?.displayName,
        email: user?.email,
        userId: user?.uid,
      }

      return {
        ...state,
        authenticatedUser: userInfo,
        authIsLoading: false,
        isAuthenticated: true,
      }
    case AuthActionTypesEnum.SIGN_OUT_FAIL:
      return {
        ...state,
        authError: action.signOutError,
      }
    case AuthActionTypesEnum.SIGN_OUT_SUCCESS:
      return {
        ...state,
        authenticatedUser: null,
        isAuthenticated: false,
      }
    default:
      return state;
  }
}