import React from 'react';
import {shallow} from 'enzyme';

import {RecipesConnected, RecipesUnwrapped} from './Recipes';
import {
  cuisineNamesSelector,
  filterByCuisineSelector,
  filteredRecipesSelector,
  filterByNameSelector,
  filterByIngredientsSelector,
  ingredientListSelector,
  recipeNamesSelector,
  recipesListSelector,
} from '../../store/selectors';
import {findByTestAttribute, storeFactory} from '../../testUtils';

test('renders wothout error', () => {
  const wrapper = shallow(<RecipesUnwrapped />);
  const recipesComponent = findByTestAttribute(wrapper, 'component-recipes');

  expect(recipesComponent.length).toBe(1);
});

describe('component recives all of the requested props from redux store', () => {
  let setup;
  let recipe;
  let mockRecipesListSelector;
  let mockFilterByCuisineSelector;
  let mockFilterByIngredientsSelector;
  let mockFilterByNameSelector;
  let mockFilteredRecipesSelector;
  beforeEach(() => {
    setup = (initialStore = {}) => {
      const store = storeFactory(initialStore);
      const wrapper = shallow(
        <RecipesConnected store={store} />
      ).dive();

      return wrapper;
    }
    recipe = {
      recipesList: [
        {
          calories: 40,
          cuisineType: ["Ainu"],
          cuisineType_ingredients: ["Ainu_ingredient1", "Ainu_ingredient3"],
          description: "fdgdfggfhgfhf 1",
          ingredients: ["ingredient1", "ingredient3"],
          instructions: ["dfgfdgdfg"],
          name: "test recipe 1",
          name_cuisineType: ["test recipe 1_Ainu"],
          name_cuisineType_ingredients: ["test recipe 1_Ainu_ingredient1", "test recipe 1_Ainu_ingredient3"],
          name_ingredients: ["test recipe 1_ingredient1", "test recipe 1_ingredient3"],
          preparationTime: 3,
          recipeId: "-M7idtWA9bXSfdY_H-v6",
          servings: 3,
        },
        {
          calories: 4000,
          cuisineType: ["Italian", "Ainu"],
          cuisineType_ingredients: (4)["Albanian_ingredient2", "Ainu_ingredient2", "Albanian_ingredient4", "Ainu_ingredient4"],
          description: "retretre",
          ingredients: ["ingredient2", "ingredient4"],
          instructions: ["reter"],
          name: "test recipe 2",
          name_cuisineType: ["test recipe 2_Albanian", "test recipe 2_Ainu"],
          name_cuisineType_ingredients: ["test recipe 2_Albanian_ingredient2", "test recipe 2_Ainu_ingredient2", "test recipe 2_Albanian_ingredient4", "test recipe 2_Ainu_ingredient4"],
          name_ingredients: ["test recipe 2_ingredient2", "test recipe 2_ingredient4"],
          preparationTime: 30,
          recipeId: "-M7ndqk3PITrvSN1vCdC",
          servings: 3,
        },
      ],
      filterByCuisine: ['Italian'],
      filterByIngredients: [],
      filterByName: [],
      recipeError: 'example error',
      recipeIsLoading: true,
    };
    mockRecipesListSelector = recipe.recipesList;
    mockFilterByCuisineSelector = recipe.filterByCuisine;
    mockFilterByIngredientsSelector = recipe.filterByIngredients;
    mockFilterByNameSelector = recipe.filterByName;
    mockFilteredRecipesSelector = filteredRecipesSelector.resultFunc(
      mockRecipesListSelector,
      mockFilterByCuisineSelector,
      mockFilterByIngredientsSelector,
      mockFilterByNameSelector,
    );
  });

  test('component gets state from cuisineNamesList selector', () => {
    const cuisineNames = cuisineNamesSelector.resultFunc(mockFilteredRecipesSelector);
    const wrapper = setup({recipe});
    const cuisineNamesListProp = wrapper.prop('cuisineNamesList');

    expect(cuisineNamesListProp).toEqual(cuisineNames);
  });

  test('component gets state from ingredientsList selector', () => {
    const ingredientsList = ingredientListSelector.resultFunc(mockFilteredRecipesSelector);

    const wrapper = setup({recipe});
    const ingredientsListProp = wrapper.prop('ingredientsList');

    expect(ingredientsListProp).toEqual(ingredientsList);
  });

  test('component gets state from recipeNamesList selector', () => {
    const recipeNamesList = recipeNamesSelector.resultFunc(mockFilteredRecipesSelector);
    const wrapper = setup({recipe});
    const recipeNamesListProp = wrapper.prop('recipeNamesList');

    expect(recipeNamesListProp).toEqual(recipeNamesList);
  });

  test('component gets state from recipesList selector', () => {
    const recipesList = recipe.recipesList;
    const wrapper = setup({recipe});
    const recipesListProp = wrapper.prop('recipesList');

    expect(recipesListProp).toEqual(recipesList);
  });

  test('component gets state from filteredRecipes selector', () => {
    const wrapper = setup({recipe});
    const filteredRecipesProp = wrapper.prop('filteredRecipes');

    expect(filteredRecipesProp).toEqual(mockFilteredRecipesSelector);
  });

  test('component gets state from recipeIsLoading piece of state', () => {
    const wrapper = setup({recipe});
    const recipeIsLoadingProp = wrapper.prop('recipeIsLoading');

    expect(recipeIsLoadingProp).toEqual(recipe.recipeIsLoading);
  });

  test('component gets recipeError piece of state', () => {
    const wrapper = setup({recipe});
    const recipeErrorProp = wrapper.prop('recipeError');

    expect(recipeErrorProp).toEqual(recipe.recipeError);
  });

  test('fetchRecipesList is an action creator passed to Recipes', () => {
    const wrapper = setup();
    const fetchRecipesListProp = wrapper.prop('fetchRecipesList');

    expect(fetchRecipesListProp).toBeInstanceOf(Function);
  });

  test('removeRecipesList is an action creator passed to Recipes', () => {
    const wrapper = setup();
    const removeRecipesListProp = wrapper.prop('removeRecipesList');

    expect(removeRecipesListProp).toBeInstanceOf(Function);
  });

  test('setRecipeFilters is an action creator passed to Recipes', () => {
    const wrapper = setup();
    const setRecipeFiltersProp = wrapper.prop('setRecipeFilters');

    expect(setRecipeFiltersProp).toBeInstanceOf(Function);
  });

  test('deleteRecipe is an action creator passed to Recipes', () => {
    const wrapper = setup();
    const deleteRecipeProp = wrapper.prop('deleteRecipe');

    expect(deleteRecipeProp).toBeInstanceOf(Function);
  });
});

describe('testing action creator calls', () => {
  let wrapper;
  const fetchRecipesListMock = jest.fn();
  const setRecipeFiltersMock = jest.fn();
  const removeRecipesListMock = jest.fn();

  beforeEach(() => {
    const props = {
      fetchRecipesList: fetchRecipesListMock,
      setRecipeFilters: setRecipeFiltersMock,
      removeRecipesList: removeRecipesListMock,
      recipesList: [
        {
          calories: 40,
          cuisineType: ["Ainu"],
          cuisineType_ingredients: ["Ainu_ingredient1", "Ainu_ingredient3"],
          description: "fdgdfggfhgfhf 1",
          ingredients: ["ingredient1", "ingredient3"],
          instructions: ["dfgfdgdfg"],
          name: "test recipe 1",
          name_cuisineType: ["test recipe 1_Ainu"],
          name_cuisineType_ingredients: ["test recipe 1_Ainu_ingredient1", "test recipe 1_Ainu_ingredient3"],
          name_ingredients: ["test recipe 1_ingredient1", "test recipe 1_ingredient3"],
          preparationTime: 3,
          recipeId: "-M7idtWA9bXSfdY_H-v6",
          servings: 3,
        },
        {
          calories: 4000,
          cuisineType: ["Italian", "Ainu"],
          cuisineType_ingredients: (4)["Albanian_ingredient2", "Ainu_ingredient2", "Albanian_ingredient4", "Ainu_ingredient4"],
          description: "retretre",
          ingredients: ["ingredient2", "ingredient4"],
          instructions: ["reter"],
          name: "test recipe 2",
          name_cuisineType: ["test recipe 2_Albanian", "test recipe 2_Ainu"],
          name_cuisineType_ingredients: ["test recipe 2_Albanian_ingredient2", "test recipe 2_Ainu_ingredient2", "test recipe 2_Albanian_ingredient4", "test recipe 2_Ainu_ingredient4"],
          name_ingredients: ["test recipe 2_ingredient2", "test recipe 2_ingredient4"],
          preparationTime: 30,
          recipeId: "-M7ndqk3PITrvSN1vCdC",
          servings: 3,
        },
      ],
    }

    wrapper = shallow(
      <RecipesUnwrapped {...props} />
    );
  });

  test('fetchRecipesList action creator gets called on componentDidMount', () => {
    wrapper.instance().componentDidMount();

    const fetchRecipesListMockCallCount = fetchRecipesListMock.mock.calls.length;

    expect(fetchRecipesListMockCallCount).toBe(1);
  });

  test('setRecipeFilters action creator gets called on ComponentDidUpdate', () => {
    wrapper.instance().componentDidUpdate();

    const setRecipeFiltersMockCallCount = setRecipeFiltersMock.mock.calls.length;

    expect(setRecipeFiltersMockCallCount).toBeGreaterThan(0);
  });

  test('removeRecipesList runs on ComponentWillUnmount', () => {
    wrapper.instance().componentWillUnmount();

    const removeRecipesListMockCallCount = removeRecipesListMock.mock.calls.length;

    expect(removeRecipesListMockCallCount).toBe(1);
  });
});



