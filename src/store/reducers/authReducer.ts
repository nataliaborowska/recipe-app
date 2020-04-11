import {ActionType} from '../actions/auth';
import {ActionTypesEnum} from '../actions/types';

export const authReducer = (state = {isAuthenticated: false}, action: ActionType) => {
  switch (action.type) {
    case ActionTypesEnum.SignIn:
      return {
        ...state,
        isAuthenticated: true,
      }
    case ActionTypesEnum.SignOut:
      return {
        ...state,
        isAuthenticated: false,
      }
    default:
      return state;
  }
}