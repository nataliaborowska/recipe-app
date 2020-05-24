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

export const filterByCuisineSelector = (state: IStoreState) => state.recipe.filterByCuisine;
export const filterByIngredientsSelector = (state: IStoreState) => state.recipe.filterByIngredients;
export const filterByNameSelector = (state: IStoreState) => state.recipe.filterByName;
export const recipeErrorSelector = (state: IStoreState) => state.recipe.recipeError;
export const recipeIsLoadingSelector = (state: IStoreState) => state.recipe.recipeIsLoading;
export const recipeIdSelector = (state: IStoreState) => state.recipe.recipeId;
export const recipeSuccessSelector = (state: IStoreState) => state.recipe.recipeSuccess;
export const recipeDataSelector = (state: IStoreState) => state.recipe.recipeData;
export const recipesListSelector = (state: IStoreState) => state.recipe.recipesList;

const filterItem = (recipesList: Array<IRecipeData>, filterKey: 'cuisineType' | 'ingredients', filterValue: any) => {
  return recipesList.filter((recipeListItem: IRecipeData) => {
    const listOfItems = recipeListItem[filterKey].filter(filteredProperty => {
      return filterValue.includes(filteredProperty);
    });

    return listOfItems.length > 0;
  });
}

const recipesFilteredByCuisinesIngredients = (recipesList: Array<IRecipeData>, cuisines: Array<string>, ingredients: Array<string>) => {
  if (cuisines.length > 0) {
    recipesList = filterItem(recipesList, 'cuisineType', cuisines);

    if (ingredients.length > 0) {
      recipesList = filterItem(recipesList, 'ingredients', ingredients);
    }
  }
  else {
    if (ingredients.length > 0) {
      recipesList = filterItem(recipesList, 'ingredients', ingredients);
    }
  }

  return recipesList;
}

export const filteredRecipesSelector = createSelector(
  recipesListSelector,
  filterByCuisineSelector,
  filterByIngredientsSelector,
  filterByNameSelector,
  (recipes: Array<IRecipeData>, cuisines: Array<string>, ingredients: Array<string>, names: Array<string>) => {
    let recipesList: Array<any> = [];

    if (names.length > 0) {
      recipesList = recipes.filter((recipe: IRecipeData) => names.includes(recipe.name));

      return recipesFilteredByCuisinesIngredients(recipesList, cuisines, ingredients);
    }

    return recipesFilteredByCuisinesIngredients(recipes, cuisines, ingredients);
  }
);

export const cuisineNamesSelector = createSelector(
  filteredRecipesSelector,
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
  filteredRecipesSelector,
  recipes => recipes.map((recipe: IRecipeData) => recipe.name)
);

export const ingredientListSelector = createSelector(
  filteredRecipesSelector,
  recipes => {
    const ingredientList: Array<any> = [];
    recipes.forEach((recipe: IRecipeData) => ingredientList.push(...recipe.ingredients));
    return ingredientList.filter((ingredient, index) => ingredientList.indexOf(ingredient) === index);
  }
);