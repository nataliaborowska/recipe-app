import {RecipeActionTypesEnum} from "./typesEnum";
import {IRecipeData} from '../../reducers/recipeReducer';

export interface CreateRecipeStartAction {
  type: RecipeActionTypesEnum.CREATE_RECIPE_START;
}

export interface CreateRecipeFailAction {
  type: RecipeActionTypesEnum.CREATE_RECIPE_FAIL;
  recipeError: string;
}

export interface CreateRecipeSuccessAction {
  type: RecipeActionTypesEnum.CREATE_RECIPE_SUCCESS;
  recipeId: string;
}

export interface CreateRecipeEndAction {
  type: RecipeActionTypesEnum.CREATE_RECIPE_END;
}

export interface FetchRecipeStartAction {
  type: RecipeActionTypesEnum.FETCH_RECIPE_START;
}

export interface FetchRecipeSuccessAction {
  type: RecipeActionTypesEnum.FETCH_RECIPE_SUCCESS;
  recipeData: IRecipeData;
}

export interface FetchRecipeFailAction {
  type: RecipeActionTypesEnum.FETCH_RECIPE_FAIL;
  recipeError: string;
}

export interface FetchRecipesListStartAction {
  type: RecipeActionTypesEnum.FETCH_RECIPES_LIST_START;
}

export interface FetchRecipesListSuccessAction {
  type: RecipeActionTypesEnum.FETCH_RECIPES_LIST_SUCCESS;
  recipesList: Array<IRecipeData>;
}

export interface FetchRecipesListFailAction {
  type: RecipeActionTypesEnum.FETCH_RECIPES_LIST_FAIL;
  recipeError: string;
}

export type RecipeActionType = CreateRecipeStartAction | CreateRecipeFailAction | CreateRecipeSuccessAction
  | CreateRecipeEndAction | FetchRecipeStartAction | FetchRecipeSuccessAction | FetchRecipeFailAction
  | FetchRecipesListStartAction | FetchRecipesListSuccessAction | FetchRecipesListFailAction;