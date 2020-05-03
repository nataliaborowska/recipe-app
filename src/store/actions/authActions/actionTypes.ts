import {AuthActionTypesEnum} from './typesEnum';
import {IUser} from '../../reducers/authReducer';

//action types
export interface ChangePasswordEndAction {
  type: AuthActionTypesEnum.ChangePasswordEnd;
}

export interface ChangePasswordFailAction {
  type: AuthActionTypesEnum.ChangePasswordFail;
  authError: string;
}

export interface ChangePasswordStartAction {
  type: AuthActionTypesEnum.ChangePasswordStart;
}

export interface ChangePasswordSuccessAction {
  type: AuthActionTypesEnum.ChangePasswordSuccess;
}

export interface FetchUsersFailAction {
  type: AuthActionTypesEnum.FetchUsersFail,
}

export interface FetchUsersStartAction {
  type: AuthActionTypesEnum.FetchUsersStart,
}

export interface FetchUsersSuccessAction {
  type: AuthActionTypesEnum.FetchUsersSuccess,
  usersList: Array<IUser>
}

export interface RemoveUsersListEndAction {
  type: AuthActionTypesEnum.RemoveUsersListEnd,
}

export interface ResetPasswordEndAction {
  type: AuthActionTypesEnum.ResetPasswordEnd,
}

export interface ResetPasswordFailAction {
  type: AuthActionTypesEnum.ResetPasswordFail;
  authError: string;
}

export interface ResetPasswordSuccessAction {
  type: AuthActionTypesEnum.ResetPasswordSuccess;
}

export interface SignInStartAction {
  type: AuthActionTypesEnum.SignInStart;
}

export interface SignInSuccessAction {
  type: AuthActionTypesEnum.SignInSuccess;
  authenticatedUser: firebase.auth.UserCredential;
}

export interface SignInFailAction {
  type: AuthActionTypesEnum.SignInFail;
  authError: string;
}

export interface SignOutFailAction {
  type: AuthActionTypesEnum.SignOutFail;
  signOutError: string;
}

export interface SignOutSuccessAction {
  type: AuthActionTypesEnum.SignOutSuccess;
  authenticatedUser: null;
}

export interface SignUpStartAction {
  type: AuthActionTypesEnum.SignUpStart;
}

export interface SignUpSuccessAction {
  type: AuthActionTypesEnum.SignUpSuccess;
  authenticatedUser: firebase.auth.UserCredential;
}

export interface SignUpFailAction {
  type: AuthActionTypesEnum.SignUpFail;
  authError: string;
}

export type AuthActionType = ChangePasswordEndAction | ChangePasswordFailAction |
  ChangePasswordStartAction | ChangePasswordSuccessAction | FetchUsersFailAction | FetchUsersSuccessAction |
  FetchUsersStartAction | RemoveUsersListEndAction | ResetPasswordEndAction | ResetPasswordFailAction |
  ResetPasswordSuccessAction | SignOutFailAction | SignOutSuccessAction | SignInStartAction | SignInSuccessAction |
  SignInFailAction | SignUpStartAction | SignUpSuccessAction | SignUpFailAction;


