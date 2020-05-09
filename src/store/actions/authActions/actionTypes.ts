import {AuthActionTypesEnum} from './typesEnum';
import {IUser} from '../../reducers/authReducer';

//action types
export interface ChangePasswordEndAction {
  type: AuthActionTypesEnum.CHANGE_PASSWORD_END;
}

export interface ChangePasswordFailAction {
  type: AuthActionTypesEnum.CHANGE_PASSWORD_FAIL;
  authError: string;
}

export interface ChangePasswordStartAction {
  type: AuthActionTypesEnum.CHANGE_PASSWORD_START;
}

export interface ChangePasswordSuccessAction {
  type: AuthActionTypesEnum.CHANGE_PASSWORD_SUCCESS;
}

export interface FetchUsersFailAction {
  type: AuthActionTypesEnum.FETCH_USERS_FAIL,
}

export interface FetchUsersStartAction {
  type: AuthActionTypesEnum.FETCH_USERS_START,
}

export interface FetchUsersSuccessAction {
  type: AuthActionTypesEnum.FETCH_USERS_SUCCESS,
  usersList: Array<IUser>
}

export interface RemoveUsersListEndAction {
  type: AuthActionTypesEnum.REMOVE_USERS_LIST_END,
}

export interface ResetPasswordEndAction {
  type: AuthActionTypesEnum.RESET_PASSWORD_END,
}

export interface ResetPasswordFailAction {
  type: AuthActionTypesEnum.RESET_PASSWORD_FAIL;
  authError: string;
}

export interface ResetPasswordSuccessAction {
  type: AuthActionTypesEnum.RESET_PASSWORD_SUCCESS;
}

export interface SignInStartAction {
  type: AuthActionTypesEnum.SIGN_IN_START;
}

export interface SignInSuccessAction {
  type: AuthActionTypesEnum.SIGN_IN_SUCCESS;
  authenticatedUser: firebase.auth.UserCredential;
}

export interface SignInFailAction {
  type: AuthActionTypesEnum.SIGN_IN_FAIL;
  authError: string;
}

export interface SignOutFailAction {
  type: AuthActionTypesEnum.SIGN_OUT_FAIL;
  signOutError: string;
}

export interface SignOutSuccessAction {
  type: AuthActionTypesEnum.SIGN_OUT_SUCCESS;
  authenticatedUser: null;
}

export interface SignUpStartAction {
  type: AuthActionTypesEnum.SIGN_UP_START;
}

export interface SignUpSuccessAction {
  type: AuthActionTypesEnum.SIGN_UP_SUCCESS;
  authenticatedUser: firebase.auth.UserCredential;
}

export interface SignUpFailAction {
  type: AuthActionTypesEnum.SIGN_UP_FAIL;
  authError: string;
}

export type AuthActionType = ChangePasswordEndAction | ChangePasswordFailAction |
  ChangePasswordStartAction | ChangePasswordSuccessAction | FetchUsersFailAction | FetchUsersSuccessAction |
  FetchUsersStartAction | RemoveUsersListEndAction | ResetPasswordEndAction | ResetPasswordFailAction |
  ResetPasswordSuccessAction | SignOutFailAction | SignOutSuccessAction | SignInStartAction | SignInSuccessAction |
  SignInFailAction | SignUpStartAction | SignUpSuccessAction | SignUpFailAction;


