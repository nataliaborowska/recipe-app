import {Dispatch} from 'redux';

import {ActionTypesEnum} from './typesEnum';

import {
  ChangePasswordAction,
  ChangePasswordFailAction,
  ChangePasswordStartAction,
  ChangePasswordSuccessAction,
  PasswordRemindFailAction,
  PasswordRemindSuccessAction,
  SignInAction,
  SignInStartAction,
  SignInSuccessAction,
  SignInFailAction,
  SignOutAction,
  SignOutFailAction,
  SignOutSuccessAction,
  SignUpStartAction,
  SignUpAction,
  SignUpSuccessAction,
  SignUpFailAction,
} from './actionTypes';

//action creators

export const changePassword = (passwordCurrent: string, passwordNew: string, firebase: any) => {
  return async (dispatch: Dispatch) => {
    dispatch<ChangePasswordStartAction>(changePasswordStart())
    try {
      await firebase.passwordUpdate(passwordNew);

      dispatch<ChangePasswordSuccessAction>(changePasswordSuccess());
    } catch (error) {
      dispatch<ChangePasswordFailAction>(changePasswordFail(error.message));
    }
  }
}

export const changePasswordStart = (): ChangePasswordStartAction => {
  return {
    type: ActionTypesEnum.ChangePasswordStart,
  }
}

export const changePasswordFail = (error: string): ChangePasswordFailAction => {
  return {
    type: ActionTypesEnum.ChangePasswordFail,
    changePasswordError: error,
  }
}

export const changePasswordSuccess = (): ChangePasswordSuccessAction => {
  return {
    type: ActionTypesEnum.ChangePasswordSuccess,
  }
}

export const remindPassword = (email: string, firebase: any) => {
  return async (dispatch: Dispatch) => {
    try {
      await firebase.passwordReset(email);

      dispatch<PasswordRemindSuccessAction>(passwordRemindSuccess());

    } catch (error) {
      dispatch<PasswordRemindFailAction>(passwordRemindFail(error.message));
    }
  }
}

export const passwordRemindSuccess = (): PasswordRemindSuccessAction => {
  return {
    type: ActionTypesEnum.PasswordRemindSuccess,
    passwordRemindLinkSent: true,
  }
}

export const passwordRemindFail = (error: string): PasswordRemindFailAction => {
  return {
    type: ActionTypesEnum.PasswordRemindFail,
    passwordRemindError: error,
  }
}

export const signIn = (email: string, password: string, firebase: any) => {
  return async (dispatch: Dispatch) => {
    dispatch<SignInStartAction>(signInStart());

    try {
      const authenticatedUser = await firebase.signInWithEmailAndPassword(email, password);

      dispatch<SignInSuccessAction>(signInSuccess(authenticatedUser))
    } catch (error) {
      dispatch<SignInFailAction>(signInFail(error.message));
    }
  }
};

export const signInStart = (): SignInStartAction => {
  return {
    type: ActionTypesEnum.SignInStart,
  }
}

export const signInSuccess = (authenticatedUser: any): SignInSuccessAction => {
  return {
    type: ActionTypesEnum.SignInSuccess,
    authenticatedUser: authenticatedUser,
  }
}

export const signInFail = (error: string): SignInFailAction => {
  return {
    type: ActionTypesEnum.SignInFail,
    signInError: error,
  }
}

export const signOut = (firebase: any) => {
  return async (dispatch: Dispatch) => {
    try {
      await firebase.signOut();

      dispatch<SignOutSuccessAction>(signOutSuccess());
    } catch (error) {
      dispatch<SignOutFailAction>(signOutFail(error.message));
    }
  }
}

export const signOutFail = (error: string): SignOutFailAction => {
  return {
    type: ActionTypesEnum.SignOutFail,
    signOutError: error,
  }
}

export const signOutSuccess = (): SignOutSuccessAction => {
  return {
    type: ActionTypesEnum.SignOutSuccess,
    authenticatedUser: null,
  }
}

export const signUp = (email: string, password: string, firebase: any) => {
  return async (dispatch: Dispatch) => {
    dispatch<SignUpStartAction>(signUpStart());

    try {
      const authenticatedUser = await firebase.createUserWithEmailAndPassword(email, password);

      dispatch<SignUpSuccessAction>(signUpSuccess(authenticatedUser));
    } catch (error) {
      dispatch<SignUpFailAction>(signUpFail(error.message));
    }
  }
}

export const signUpStart = (): SignUpStartAction => {
  return {
    type: ActionTypesEnum.SignUpStart,
  }
}

export const signUpSuccess = (authenticatedUser: any): SignUpSuccessAction => {
  return {
    type: ActionTypesEnum.SignUpSuccess,
    authenticatedUser: authenticatedUser,
  }
}

export const signUpFail = (error: string): SignUpFailAction => {
  return {
    type: ActionTypesEnum.SignUpFail,
    signUpError: error,
  }
}

