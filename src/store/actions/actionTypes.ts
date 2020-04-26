import {ActionTypesEnum} from './typesEnum';
import {IUser} from '../reducers/authReducer';

//action types
export interface ChangePasswordEndAction {
  type: ActionTypesEnum.ChangePasswordEnd;
}

export interface ChangePasswordFailAction {
  type: ActionTypesEnum.ChangePasswordFail;
  authError: string;
}

export interface ChangePasswordStartAction {
  type: ActionTypesEnum.ChangePasswordStart;
}

export interface ChangePasswordSuccessAction {
  type: ActionTypesEnum.ChangePasswordSuccess;
}

export interface FetchUsersFailAction {
  type: ActionTypesEnum.FetchUsersFail,
}

export interface FetchUsersStartAction {
  type: ActionTypesEnum.FetchUsersStart,
}

export interface FetchUsersSuccessAction {
  type: ActionTypesEnum.FetchUsersSuccess,
  usersList: Array<IUser>
}

export interface RemoveUsersListEndAction {
  type: ActionTypesEnum.RemoveUsersListEnd,
}

export interface ResetPasswordEndAction {
  type: ActionTypesEnum.ResetPasswordEnd,
}

export interface ResetPasswordFailAction {
  type: ActionTypesEnum.ResetPasswordFail;
  authError: string;
}

export interface ResetPasswordSuccessAction {
  type: ActionTypesEnum.ResetPasswordSuccess;
}

export interface SignInStartAction {
  type: ActionTypesEnum.SignInStart;
}

export interface SignInSuccessAction {
  type: ActionTypesEnum.SignInSuccess;
  authenticatedUser: firebase.auth.UserCredential;
}

export interface SignInFailAction {
  type: ActionTypesEnum.SignInFail;
  authError: string;
}

export interface SignOutFailAction {
  type: ActionTypesEnum.SignOutFail;
  signOutError: string;
}

export interface SignOutSuccessAction {
  type: ActionTypesEnum.SignOutSuccess;
  authenticatedUser: null;
}

export interface SignUpStartAction {
  type: ActionTypesEnum.SignUpStart;
}

export interface SignUpSuccessAction {
  type: ActionTypesEnum.SignUpSuccess;
  authenticatedUser: firebase.auth.UserCredential;
}

export interface SignUpFailAction {
  type: ActionTypesEnum.SignUpFail;
  authError: string;
}

export type AuthActionType = ChangePasswordEndAction | ChangePasswordFailAction |
  ChangePasswordStartAction | ChangePasswordSuccessAction | FetchUsersFailAction | FetchUsersSuccessAction |
  FetchUsersStartAction | RemoveUsersListEndAction | ResetPasswordEndAction | ResetPasswordFailAction |
  ResetPasswordSuccessAction | SignOutFailAction | SignOutSuccessAction | SignInStartAction | SignInSuccessAction |
  SignInFailAction | SignUpStartAction | SignUpSuccessAction | SignUpFailAction;


