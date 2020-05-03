import {Action, applyMiddleware, combineReducers, createStore} from 'redux';
import {authReducer, IAuthState} from './reducers/authReducer';
import {recipeReducer, IRecipeState} from './reducers/recipeReducer';
import thunk, {ThunkAction} from 'redux-thunk';

export interface IStoreState {
  auth: IAuthState;
  recipe: IRecipeState;
}

const rootReducer = combineReducers({
  auth: authReducer,
  recipe: recipeReducer,
});


const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootStore = ReturnType<typeof rootReducer>;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootStore, unknown, Action<string>>

export default store;