import {Dispatch} from 'redux';

import {ActionTypesEnum} from './typesEnum';

import {
  ChangePasswordAction,
  ChangePasswordEndAction,
  ChangePasswordFailAction,
  ChangePasswordStartAction,
  ChangePasswordSuccessAction,
  ResetPasswordEndAction,
  ResetPasswordFailAction,
  ResetPasswordSuccessAction,
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

export const changePassword = (passwordNew: string, firebase: any) => {
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

export const changePasswordEnd = (): ChangePasswordEndAction => {
  return {
    type: ActionTypesEnum.ChangePasswordEnd,
  }
}

export const changePasswordFail = (error: string): ChangePasswordFailAction => {
  return {
    type: ActionTypesEnum.ChangePasswordFail,
    authError: error,
  }
}

export const changePasswordSuccess = (): ChangePasswordSuccessAction => {
  return {
    type: ActionTypesEnum.ChangePasswordSuccess,
  }
}

export const resetPassword = (email: string, firebase: any) => {
  return async (dispatch: Dispatch) => {
    try {
      await firebase.passwordReset(email);

      dispatch<ResetPasswordSuccessAction>(resetPasswordSuccess());

    } catch (error) {
      dispatch<ResetPasswordFailAction>(resetPasswordFail(error.message));
    }
  }
}

export const resetPasswordSuccess = (): ResetPasswordSuccessAction => {
  return {
    type: ActionTypesEnum.ResetPasswordSuccess,
  }
}


export const resetPasswordEnd = (): ResetPasswordEndAction => {
  return {
    type: ActionTypesEnum.ResetPasswordEnd,
  }
}

export const resetPasswordFail = (error: string): ResetPasswordFailAction => {
  return {
    type: ActionTypesEnum.ResetPasswordFail,
    authError: error,
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
    authError: error,
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

export const signUp = (email: string, password: string, username: string, firebase: any) => {
  return async (dispatch: Dispatch) => {
    dispatch<SignUpStartAction>(signUpStart());

    try {
      const authenticatedUser = await firebase.createUserWithEmailAndPassword(email, password);

      dispatch<any>(saveUserToDatabase(email, username, authenticatedUser, firebase))
      //dispatch<SignUpSuccessAction>(signUpSuccess(authenticatedUser));
    } catch (error) {
      dispatch<SignUpFailAction>(signUpFail(error.message));
    } finally {
      // if (authenticatedUser) {
      //   try {
      //     await firebase
      //       .user(authenticatedUser.user.uid)
      //       .set({email, username})
      //   } catch (error) {
      //     dispatch<SignUpFailAction>(signUpFail(error.message));
      //   }
      // }
    }
  }
}

export const saveUserToDatabase = (email: string, username: string, authenticatedUser: any, firebase: any) => {
  return async (dispatch: Dispatch) => {
    try {
      await firebase
        .user(authenticatedUser.user.uid)
        .set({email, username});

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
    authError: error,
  }
}

