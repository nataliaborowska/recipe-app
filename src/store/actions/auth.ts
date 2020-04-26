import {Dispatch} from 'redux';

import {ActionTypesEnum} from './typesEnum';
import {AppThunk} from '../store';
import {IFirebase} from '../../components/Firebase';

import {
  ChangePasswordEndAction,
  ChangePasswordFailAction,
  ChangePasswordStartAction,
  ChangePasswordSuccessAction,
  FetchUsersFailAction,
  FetchUsersStartAction,
  FetchUsersSuccessAction,
  RemoveUsersListEndAction,
  ResetPasswordEndAction,
  ResetPasswordFailAction,
  ResetPasswordSuccessAction,
  SignInStartAction,
  SignInSuccessAction,
  SignInFailAction,
  SignOutFailAction,
  SignOutSuccessAction,
  SignUpStartAction,
  SignUpSuccessAction,
  SignUpFailAction,
} from './actionTypes';

//action creators
export const changePassword = (passwordNew: string, firebase: IFirebase): AppThunk => {
  return async (dispatch: Dispatch) => {
    dispatch<ChangePasswordStartAction>({
      type: ActionTypesEnum.ChangePasswordStart,
    });
    try {
      if (firebase.passwordUpdate) {
        await firebase.passwordUpdate(passwordNew);
      }

      dispatch<ChangePasswordSuccessAction>({
        type: ActionTypesEnum.ChangePasswordSuccess,
      });
    } catch (error) {
      dispatch<ChangePasswordFailAction>(changePasswordFail(error.message));
    }
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

export const fetchUsersList = (firebase: IFirebase): AppThunk => {
  return async (dispatch: Dispatch) => {
    dispatch<FetchUsersStartAction>({
      type: ActionTypesEnum.FetchUsersStart,
    });

    try {
      await firebase.users().on('value', (snapshot: firebase.database.DataSnapshot) => {
        const users = snapshot.val();
        const usersList = Object.keys(users).map(key => {
          return {
            ...users[key],
            userId: key,
          }
        });
        dispatch<FetchUsersSuccessAction>({
          type: ActionTypesEnum.FetchUsersSuccess,
          usersList: usersList,
        });
      });
    } catch (error) {
      dispatch<FetchUsersFailAction>({
        type: ActionTypesEnum.FetchUsersFail,
      });
    }
  }
}

export const removeUsersList = (firebase: IFirebase): AppThunk => {
  return async (dispatch: Dispatch) => {
    try {
      await firebase.users().off();
    } catch (error) {
      throw (error);
    } finally {
      dispatch<RemoveUsersListEndAction>({
        type: ActionTypesEnum.RemoveUsersListEnd,
      });
    }
  }
}

export const resetPassword = (email: string, firebase: IFirebase): AppThunk => {
  return async (dispatch: Dispatch) => {
    try {
      await firebase.passwordReset(email);

      dispatch<ResetPasswordSuccessAction>({
        type: ActionTypesEnum.ResetPasswordSuccess,
      });

    } catch (error) {
      dispatch<ResetPasswordFailAction>(resetPasswordFail(error.message));
    }
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

export const saveUserToDatabase = (
  email: string,
  username: string,
  authenticatedUser: any,
  firebase: IFirebase
): AppThunk => {
  return async (dispatch: Dispatch) => {
    try {
      await firebase
        .user(authenticatedUser.user.uid)
        .set({email, username});

      dispatch<SignUpSuccessAction>({
        type: ActionTypesEnum.SignUpSuccess,
        authenticatedUser: authenticatedUser,
      });
    } catch (error) {
      dispatch<SignUpFailAction>({
        type: ActionTypesEnum.SignUpFail,
        authError: error.message,
      });
    }
  }
}

export const signIn = (email: string, password: string, firebase: IFirebase): AppThunk => {
  return async (dispatch: Dispatch) => {
    dispatch<SignInStartAction>({
      type: ActionTypesEnum.SignInStart,
    });

    try {
      const authenticatedUser = await firebase.signInWithEmailAndPassword(email, password);

      dispatch<SignInSuccessAction>({
        type: ActionTypesEnum.SignInSuccess,
        authenticatedUser: authenticatedUser,
      });
    } catch (error) {
      dispatch<SignInFailAction>({
        type: ActionTypesEnum.SignInFail,
        authError: error.message,
      });
    }
  }
};

export const signOut = (firebase: IFirebase): AppThunk => {
  return async (dispatch: Dispatch) => {
    try {
      await firebase.signOut();

      dispatch<SignOutSuccessAction>({
        type: ActionTypesEnum.SignOutSuccess,
        authenticatedUser: null,
      });
    } catch (error) {
      dispatch<SignOutFailAction>({
        type: ActionTypesEnum.SignOutFail,
        signOutError: error.message,
      });
    }
  }
}

export const signUp = (
  email: string,
  password: string,
  username: string,
  firebase: IFirebase
): AppThunk => {
  return async (dispatch: Dispatch) => {
    dispatch<SignUpStartAction>({
      type: ActionTypesEnum.SignUpStart,
    });

    try {
      const authenticatedUser = await firebase.createUserWithEmailAndPassword(email, password);

      dispatch<any>(saveUserToDatabase(email, username, authenticatedUser, firebase))
    } catch (error) {
      dispatch<SignUpFailAction>({
        type: ActionTypesEnum.SignUpFail,
        authError: error.message,
      });
    }
  }
}
