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

export interface EditRecipeStartAction {
  type: RecipeActionTypesEnum.EDIT_RECIPE_START;
}

export interface EditRecipeFailAction {
  type: RecipeActionTypesEnum.EDIT_RECIPE_FAIL;
  recipeError: string;
}

export interface EditRecipeSuccessAction {
  type: RecipeActionTypesEnum.EDIT_RECIPE_SUCCESS;
}

export interface EditRecipeEndAction {
  type: RecipeActionTypesEnum.EDIT_RECIPE_END;
}

export interface DeleteRecipeFailAction {
  type: RecipeActionTypesEnum.DELETE_RECIPE_FAIL;
  recipeError: string;
}

export interface DeleteRecipeStartAction {
  type: RecipeActionTypesEnum.DELETE_RECIPE_START;
}

export interface DeleteRecipeSuccessAction {
  type: RecipeActionTypesEnum.DELETE_RECIPE_SUCCESS;
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

export interface RemoveRecipesListEndAction {
  type: RecipeActionTypesEnum.REMOVE_RECIPES_LIST_END;
}

export interface SetRecipeFiltersAction {
  filterByName: Array<string>,
  filterByCuisine: Array<string>,
  filterByIngredients: Array<string>,
  type: RecipeActionTypesEnum.SET_RECIPE_FILTERS,
}

export type RecipeActionType = CreateRecipeStartAction | CreateRecipeFailAction | CreateRecipeSuccessAction
  | CreateRecipeEndAction | EditRecipeStartAction | EditRecipeFailAction | EditRecipeSuccessAction
  | EditRecipeEndAction | DeleteRecipeFailAction | DeleteRecipeStartAction | DeleteRecipeSuccessAction
  | FetchRecipeStartAction | FetchRecipeSuccessAction | FetchRecipeFailAction
  | FetchRecipesListStartAction | FetchRecipesListSuccessAction | FetchRecipesListFailAction
  | RemoveRecipesListEndAction | SetRecipeFiltersAction;