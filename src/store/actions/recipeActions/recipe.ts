import {Dispatch} from 'redux';

import {RecipeActionTypesEnum} from './typesEnum';
import {IFirebase} from '../../../components/Firebase';
import {AppThunk} from '../../store';
import {IRecipeData} from '../../reducers/recipeReducer';

import {
  CreateRecipeEndAction,
  CreateRecipeSuccessAction,
  CreateRecipeStartAction,
  CreateRecipeFailAction,
  EditRecipeEndAction,
  EditRecipeSuccessAction,
  EditRecipeStartAction,
  EditRecipeFailAction,
  FetchRecipeFailAction,
  FetchRecipeStartAction,
  FetchRecipeSuccessAction,
  FetchRecipesListFailAction,
  FetchRecipesListStartAction,
  FetchRecipesListSuccessAction,
  RemoveRecipesListEndAction,
} from './actionTypes';

//action creators
export const createRecipeEnd = (): CreateRecipeEndAction => {
  return {
    type: RecipeActionTypesEnum.CREATE_RECIPE_END,
  }
}

export const createRecipeFail = (error: string): CreateRecipeFailAction => {
  return {
    type: RecipeActionTypesEnum.CREATE_RECIPE_FAIL,
    recipeError: error
  }
}

export const createRecipe = (values: IRecipeData, firebase: IFirebase): AppThunk => {
  return async (dispatch: Dispatch) => {
    dispatch<CreateRecipeStartAction>({
      type: RecipeActionTypesEnum.CREATE_RECIPE_START,
    });

    try {
      const recipeData = await firebase.createRecipe(values);

      dispatch<CreateRecipeSuccessAction>({
        type: RecipeActionTypesEnum.CREATE_RECIPE_SUCCESS,
        recipeId: recipeData.key,
      })

    } catch (error) {
      dispatch<CreateRecipeFailAction>(createRecipeFail(error.message))
    }
  }
}

export const editRecipeEnd = (): EditRecipeEndAction => {
  return {
    type: RecipeActionTypesEnum.EDIT_RECIPE_END,
  }
}

export const editRecipeFail = (error: string): EditRecipeFailAction => {
  return {
    type: RecipeActionTypesEnum.EDIT_RECIPE_FAIL,
    recipeError: error
  }
}

export const editRecipe = (values: IRecipeData, firebase: IFirebase): AppThunk => {
  return async (dispatch: Dispatch) => {
    dispatch<EditRecipeStartAction>({
      type: RecipeActionTypesEnum.EDIT_RECIPE_START,
    });

    try {
      const recipeData = await firebase.updateRecipe(values);

      dispatch<EditRecipeSuccessAction>({
        type: RecipeActionTypesEnum.EDIT_RECIPE_SUCCESS,
        recipeId: recipeData.key,
      })

    } catch (error) {
      dispatch<EditRecipeFailAction>(editRecipeFail(error.message))
    }
  }
}

export const fetchRecipeData = (recipeId: string, firebase: IFirebase): AppThunk => {
  return async (dispatch: Dispatch) => {
    dispatch<FetchRecipeStartAction>({
      type: RecipeActionTypesEnum.FETCH_RECIPE_START,
    });

    try {
      await firebase.recipe(recipeId).on('value', (snapshot: firebase.database.DataSnapshot) => {
        const recipeData = snapshot.val();

        dispatch<FetchRecipeSuccessAction>({
          type: RecipeActionTypesEnum.FETCH_RECIPE_SUCCESS,
          recipeData: recipeData,
        });
      });
    } catch (error) {
      dispatch<FetchRecipeFailAction>({
        type: RecipeActionTypesEnum.FETCH_RECIPE_FAIL,
        recipeError: error,
      });
    }
  }
}

export const fetchRecipesList = (firebase: IFirebase): AppThunk => {
  return async (dispatch: Dispatch) => {
    dispatch<FetchRecipesListStartAction>({
      type: RecipeActionTypesEnum.FETCH_RECIPES_LIST_START,
    });

    try {
      await firebase.recipes().on('value', (snapshot: firebase.database.DataSnapshot) => {
        const recipes = snapshot.val();
        const recipesList = Object.keys(recipes).map(key => {
          return {
            ...recipes[key],
            recipeId: key,
          }
        });

        dispatch<FetchRecipesListSuccessAction>({
          type: RecipeActionTypesEnum.FETCH_RECIPES_LIST_SUCCESS,
          recipesList: recipesList,
        });
      });
    } catch (error) {
      dispatch<FetchRecipesListFailAction>({
        type: RecipeActionTypesEnum.FETCH_RECIPES_LIST_FAIL,
        recipeError: error,
      });
    }
  }
}

export const removeRecipesList = (firebase: IFirebase): AppThunk => {
  return async (dispatch: Dispatch) => {
    try {
      await firebase.recipes().off();
    } catch (error) {
      throw (error);
    } finally {
      dispatch<RemoveRecipesListEndAction>({
        type: RecipeActionTypesEnum.REMOVE_RECIPES_LIST_END,
      });
    }
  }
}
