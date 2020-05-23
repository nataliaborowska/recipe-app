import {createSelector} from 'reselect';

import {IRecipeData} from './reducers/recipeReducer';

import {IStoreState} from './store';

export const authenticatedUserSelector = (state: IStoreState) => state.auth.authenticatedUser;
export const authErrorSelector = (state: IStoreState) => state.auth.authError;
export const authIsLoadingSelector = (state: IStoreState) => state.auth.authIsLoading;
export const changePasswordSuccessSelector = (state: IStoreState) => state.auth.changePasswordSuccess;
export const fetchingUsersSelector = (state: IStoreState) => state.auth.fetchingUsers;
export const fetchUsersErrorSelector = (state: IStoreState) => state.auth.fetchUsersError;
export const isAuthenticatedSelector = (state: IStoreState) => state.auth.isAuthenticated;
export const resetPasswordSuccessSelector = (state: IStoreState) => state.auth.resetPasswordSuccess;
export const usersSelector = (state: IStoreState) => state.auth.users;

export const recipeErrorSelector = (state: IStoreState) => state.recipe.recipeError;
export const recipeIsLoadingSelector = (state: IStoreState) => state.recipe.recipeIsLoading;
export const recipeIdSelector = (state: IStoreState) => state.recipe.recipeId;
export const recipeSuccessSelector = (state: IStoreState) => state.recipe.recipeSuccess;
export const recipeDataSelector = (state: IStoreState) => state.recipe.recipeData;
export const recipesListSelector = (state: IStoreState) => state.recipe.recipesList;

export const cuisineNamesSelector = createSelector(
  recipesListSelector,
  recipes => {
    const cuisineList: Array<string> = [];

    recipes.forEach((recipe: IRecipeData) => {
      if (recipe.cuisineType) {
        cuisineList.push(...recipe.cuisineType);
      }
    });

    return cuisineList.filter((cuisine, index) => cuisineList.indexOf(cuisine) === index);
  }
);

export const recipeNamesSelector = createSelector(
  recipesListSelector,
  recipes => recipes.map((recipe: IRecipeData) => recipe.name)
);

export const ingredientListSelector = createSelector(
  recipesListSelector,
  recipes => {
    const ingredientList: Array<any> = [];
    recipes.forEach((recipe: IRecipeData) => ingredientList.push(...recipe.ingredients));
    return ingredientList.filter((ingredient, index) => ingredientList.indexOf(ingredient) === index);
  }
)