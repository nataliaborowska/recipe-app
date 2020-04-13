import {ActionTypesEnum} from './typesEnum';

//action types
export interface ChangePasswordAction {
  type: ActionTypesEnum.ChangePassword;
}

export interface ChangePasswordFailAction {
  type: ActionTypesEnum.ChangePasswordFail;
  changePasswordError: string;
}

export interface ChangePasswordStartAction {
  type: ActionTypesEnum.ChangePasswordStart;
}

export interface ChangePasswordSuccessAction {
  type: ActionTypesEnum.ChangePasswordSuccess;
}

export interface PasswordRemindFailAction {
  type: ActionTypesEnum.PasswordRemindFail;
  passwordRemindError: string;
}

export interface PasswordRemindSuccessAction {
  type: ActionTypesEnum.PasswordRemindSuccess;
  passwordRemindLinkSent: boolean;
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
  signInError: string;
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
  signUpError: string;
}

export type ActionType = ChangePasswordAction | ChangePasswordFailAction | ChangePasswordStartAction | ChangePasswordSuccessAction |
  PasswordRemindFailAction | PasswordRemindSuccessAction | SignOutFailAction | SignOutSuccessAction | SignInStartAction |
  SignInSuccessAction | SignInFailAction | SignUpStartAction | SignUpSuccessAction | SignUpFailAction;


