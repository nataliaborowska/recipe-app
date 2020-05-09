import {RecipeActionType} from '../actions/recipeActions/actionTypes';
import {RecipeActionTypesEnum} from '../actions/recipeActions/typesEnum';

export interface IRecipeData {
  calories: number;
  description: string;
  ingredients: Array<string>;
  instructions: Array<string>;
  name: string;
  preparationTime: number;
  servings: number;
  recipeId?: string;
}

export interface IRecipeState {
  recipeError: null | string;
  recipeIsLoading: boolean;
  recipeId: null | any;
  recipeSuccess: boolean;
  recipeData: any;
  recipesList: Array<IRecipeData>;
}

const initialState: IRecipeState = {
  recipeError: null,
  recipeSuccess: false,
  recipeIsLoading: false,
  recipeId: null,
  recipeData: null,
  recipesList: [] as Array<IRecipeData>,
}

export const recipeReducer = (state = initialState, action: RecipeActionType): IRecipeState => {
  switch (action.type) {
    case RecipeActionTypesEnum.CREATE_RECIPE_END:
    case RecipeActionTypesEnum.EDIT_RECIPE_END:
      return {
        ...state,
        recipeError: null,
        recipeSuccess: false,
      }
    case RecipeActionTypesEnum.CREATE_RECIPE_FAIL:
    case RecipeActionTypesEnum.EDIT_RECIPE_FAIL:
      return {
        ...state,
        recipeError: action.recipeError,
        recipeIsLoading: false,
      }
    case RecipeActionTypesEnum.CREATE_RECIPE_SUCCESS:
    case RecipeActionTypesEnum.EDIT_RECIPE_SUCCESS:
      return {
        ...state,
        recipeError: null,
        recipeIsLoading: false,
        recipeId: action.recipeId,
        recipeSuccess: true,
      }
    case RecipeActionTypesEnum.CREATE_RECIPE_START:
    case RecipeActionTypesEnum.EDIT_RECIPE_START:
      return {
        ...state,
        recipeError: null,
        recipeIsLoading: true,
      }
    case RecipeActionTypesEnum.FETCH_RECIPE_START:
      return {
        ...state,
        recipeError: null,
      }
    case RecipeActionTypesEnum.FETCH_RECIPE_SUCCESS:
      return {
        ...state,
        recipeError: null,
        recipeData: action.recipeData,
      }
    case RecipeActionTypesEnum.FETCH_RECIPE_FAIL:
      return {
        ...state,
        recipeError: action.recipeError,
      }
    case RecipeActionTypesEnum.FETCH_RECIPES_LIST_START:
      return {
        ...state,
        recipeError: null,
      }
    case RecipeActionTypesEnum.FETCH_RECIPES_LIST_SUCCESS:
      return {
        ...state,
        recipeError: null,
        recipesList: action.recipesList,
      }
    case RecipeActionTypesEnum.FETCH_RECIPES_LIST_FAIL:
      return {
        ...state,
        recipeError: action.recipeError,
      }
    case RecipeActionTypesEnum.REMOVE_RECIPES_LIST_END:
      return {
        ...state,
        recipesList: [],
      }
    default:
      return state;
  }
}
