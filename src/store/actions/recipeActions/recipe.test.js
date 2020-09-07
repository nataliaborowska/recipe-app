import {RecipeActionTypesEnum} from './typesEnum';
import {
  createRecipeEnd,
  createRecipeFail,
  editRecipeEnd,
  editRecipeFail,
  setRecipeFilters
} from './recipe';

describe('recipe action creators', () => {
  test('returns action with type CREATE_RECIPE_END', () => {
    const action = createRecipeEnd();

    expect(action).toEqual({
      type: RecipeActionTypesEnum.CREATE_RECIPE_END,
    });
  });

  test('returns action with type CREATE_RECIPE_FAIL', () => {
    const errorString = 'some error string';
    const action = createRecipeFail(errorString);

    expect(action).toEqual({
      type: RecipeActionTypesEnum.CREATE_RECIPE_FAIL,
      recipeError: errorString,
    });
  });

  test('returns action with type EDIT_RECIPE_END', () => {
    const action = editRecipeEnd();

    expect(action).toEqual({
      type: RecipeActionTypesEnum.EDIT_RECIPE_END,
    });
  });

  test('returns action with type EDIT_RECIPE_FAIL', () => {
    const errorString = 'some error string';
    const action = editRecipeFail(errorString);

    expect(action).toEqual({
      type: RecipeActionTypesEnum.EDIT_RECIPE_FAIL,
      recipeError: errorString,
    });
  });

  test('returns action with type SET_RECIPE_FILTERS', () => {
    const recipeName = 'recipe1';
    const cuisine = ['cuisine1'];
    const ingredients = ['carrots', 'meat'];
    const action = setRecipeFilters(recipeName, cuisine, ingredients);

    expect(action).toEqual({
      type: RecipeActionTypesEnum.SET_RECIPE_FILTERS,
      filterByName: recipeName,
      filterByCuisine: cuisine,
      filterByIngredients: ingredients,
    });
  });
});