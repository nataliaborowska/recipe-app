import {Dispatch} from 'redux';

import {AuthActionTypesEnum} from './typesEnum';
import {AppThunk} from '../../store';
import {IFirebase} from '../../../components/Firebase';

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
export const changePassword = (passwordNew: string, firebase: IFirebase): AppThunk<void> => {
  return async (dispatch: Dispatch) => {
    dispatch<ChangePasswordStartAction>({
      type: AuthActionTypesEnum.CHANGE_PASSWORD_START,
    });
    try {
      if (firebase.passwordUpdate) {
        await firebase.passwordUpdate(passwordNew);
      }

      dispatch<ChangePasswordSuccessAction>({
        type: AuthActionTypesEnum.CHANGE_PASSWORD_SUCCESS,
      });
    } catch (error) {
      dispatch<ChangePasswordFailAction>(changePasswordFail(error.message));
    }
  }
}

export const changePasswordEnd = (): ChangePasswordEndAction => {
  return {
    type: AuthActionTypesEnum.CHANGE_PASSWORD_END,
  }
}

export const changePasswordFail = (error: string): ChangePasswordFailAction => {
  return {
    type: AuthActionTypesEnum.CHANGE_PASSWORD_FAIL,
    authError: error,
  }
}

export const fetchUsersList = (firebase: IFirebase): AppThunk<void> => {
  return async (dispatch: Dispatch) => {
    dispatch<FetchUsersStartAction>({
      type: AuthActionTypesEnum.FETCH_USERS_START,
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
          type: AuthActionTypesEnum.FETCH_USERS_SUCCESS,
          usersList: usersList,
        });
      });
    } catch (error) {
      dispatch<FetchUsersFailAction>({
        type: AuthActionTypesEnum.FETCH_USERS_FAIL,
      });
    }
  }
}

export const removeUsersList = (firebase: IFirebase): AppThunk<void> => {
  return async (dispatch: Dispatch) => {
    try {
      await firebase.users().off();
    } catch (error) {
      throw (error);
    } finally {
      dispatch<RemoveUsersListEndAction>({
        type: AuthActionTypesEnum.REMOVE_USERS_LIST_END,
      });
    }
  }
}

export const resetPassword = (email: string, firebase: IFirebase): AppThunk<void> => {
  return async (dispatch: Dispatch) => {
    try {
      await firebase.passwordReset(email);

      dispatch<ResetPasswordSuccessAction>({
        type: AuthActionTypesEnum.RESET_PASSWORD_SUCCESS,
      });

    } catch (error) {
      dispatch<ResetPasswordFailAction>(resetPasswordFail(error.message));
    }
  }
}

export const resetPasswordEnd = (): ResetPasswordEndAction => {
  return {
    type: AuthActionTypesEnum.RESET_PASSWORD_END,
  }
}

export const resetPasswordFail = (error: string): ResetPasswordFailAction => {
  return {
    type: AuthActionTypesEnum.RESET_PASSWORD_FAIL,
    authError: error,
  }
}

export const saveUserToDatabase = (
  email: string,
  username: string,
  authenticatedUser: firebase.auth.UserCredential,
  firebase: IFirebase
): AppThunk<void> => {
  return async (dispatch: Dispatch) => {
    if (authenticatedUser.user) {
      try {
        await firebase
          .user(authenticatedUser.user.uid)
          .set({email, username});

        dispatch<SignUpSuccessAction>({
          type: AuthActionTypesEnum.SIGN_UP_SUCCESS,
          authenticatedUser: authenticatedUser,
        });
      } catch (error) {
        dispatch<SignUpFailAction>({
          type: AuthActionTypesEnum.SIGN_UP_FAIL,
          authError: error.message,
        });
      }
    }
  }
}

export const signInSuccess = (authenticatedUser: firebase.auth.UserCredential): SignInSuccessAction => {
  return {
    type: AuthActionTypesEnum.SIGN_IN_SUCCESS,
    authenticatedUser: authenticatedUser,
  }
}

export const signIn = (email: string, password: string, firebase: IFirebase): AppThunk<void> => {
  return async (dispatch: Dispatch) => {
    dispatch<SignInStartAction>({
      type: AuthActionTypesEnum.SIGN_IN_START,
    });

    try {
      const authenticatedUser = await firebase.signInWithEmailAndPassword(email, password);

      dispatch<SignInSuccessAction>(signInSuccess(authenticatedUser));
    } catch (error) {
      dispatch<SignInFailAction>({
        type: AuthActionTypesEnum.SIGN_IN_FAIL,
        authError: error.message,
      });
    }
  }
};

export const signOut = (firebase: IFirebase): AppThunk<void> => {
  return async (dispatch: Dispatch) => {
    try {
      await firebase.signOut();

      dispatch<SignOutSuccessAction>({
        type: AuthActionTypesEnum.SIGN_OUT_SUCCESS,
        authenticatedUser: null,
      });
    } catch (error) {
      dispatch<SignOutFailAction>({
        type: AuthActionTypesEnum.SIGN_OUT_FAIL,
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
): AppThunk<void> => {
  return async (dispatch: Dispatch) => {
    dispatch<SignUpStartAction>({
      type: AuthActionTypesEnum.SIGN_UP_START,
    });

    try {
      const authenticatedUser = await firebase.createUserWithEmailAndPassword(email, password);

      dispatch<any>(saveUserToDatabase(email, username, authenticatedUser, firebase))
    } catch (error) {
      dispatch<SignUpFailAction>({
        type: AuthActionTypesEnum.SIGN_UP_FAIL,
        authError: error.message,
      });
    }
  }
}
