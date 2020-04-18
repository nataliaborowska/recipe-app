import {ActionTypesEnum} from './typesEnum';

//action types
export interface ChangePasswordAction {
  type: ActionTypesEnum.ChangePassword;
}

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

export interface SignInAction {
  type: ActionTypesEnum.SignIn;
}

export interface SignInStartAction {
  type: ActionTypesEnum.SignInStart;
}

export interface SignInSuccessAction {
  type: ActionTypesEnum.SignInSuccess;
  authenticatedUser: any;
}

export interface SignInFailAction {
  type: ActionTypesEnum.SignInFail;
  authError: string;
}

export interface SignOutAction {
  type: ActionTypesEnum.SignOut;
}

export interface SignOutFailAction {
  type: ActionTypesEnum.SignOutFail;
  signOutError: string;
}

export interface SignOutSuccessAction {
  type: ActionTypesEnum.SignOutSuccess;
  authenticatedUser: any;
}

export interface SignUpStartAction {
  type: ActionTypesEnum.SignUpStart;
}

export interface SignUpAction {
  type: ActionTypesEnum.SignUp;
}

export interface SignUpSuccessAction {
  type: ActionTypesEnum.SignUpSuccess;
  authenticatedUser: any;
}

export interface SignUpFailAction {
  type: ActionTypesEnum.SignUpFail;
  authError: string;
}

export type ActionType = ChangePasswordEndAction | ChangePasswordAction | ChangePasswordFailAction |
  ChangePasswordStartAction | ChangePasswordSuccessAction | ResetPasswordEndAction | ResetPasswordFailAction | ResetPasswordSuccessAction |
  SignOutFailAction | SignOutSuccessAction | SignInStartAction | SignInSuccessAction | SignInFailAction | SignUpStartAction |
  SignUpSuccessAction | SignUpFailAction;


