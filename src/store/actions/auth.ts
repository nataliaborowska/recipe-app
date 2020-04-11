import {ActionTypesEnum} from './types'

//action types
export interface SignInAction {
  type: ActionTypesEnum.SignIn;
}

export interface SignOutAction {
  type: ActionTypesEnum.SignOut;
}

export type ActionType = SignOutAction | SignInAction;

//action creators
export const signIn = (): SignInAction => {
  return {
    type: ActionTypesEnum.SignIn,
  }
};

export const signOut = (): SignOutAction => {
  return {
    type: ActionTypesEnum.SignOut,
  }
}

