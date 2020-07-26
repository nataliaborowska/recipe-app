import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {shallow} from 'enzyme';

import {Reacipe, RecipeConnected, RecipeUnwrapped} from './Recipe';
import {findByTestAttribute, storeFactory} from '../../testUtils';

test('renders without error', () => {
  const setup = (initialState = {}) => {
    const store = storeFactory(initialState);
    const wrapper = shallow(
      <BrowserRouter>
        <RecipeUnwrapped store={store} />
      </BrowserRouter>
    ).dive().dive().dive();

    return wrapper;
  }

  const wrapper = setup();
  const recipeComponent = findByTestAttribute(wrapper, 'component-recipe');

  expect(recipeComponent.length).toBe(1);
});

describe('gets all of the props', () => {
  const setup = (initialState = {}) => {
    const store = storeFactory(initialState);
    const wrapper = shallow(
      <BrowserRouter>
        <RecipeConnected store={store} />
      </BrowserRouter>
    ).dive().dive().dive().dive();

    return wrapper;
  }

  test('receives the recipeData piece of state', () => {
    const recipe = {
      recipeData: {
        calories: 400,
        cuisineType: ['italian'],
        description: 'blah blah',
        ingredients: ['pepper'],
        instructions: ['do th', 'do sth else'],
        name: 'some recipe name',
        preparationTime: 30,
        servings: 2,
        recipeId: 'testId',
      }
    }
    const wrapper = setup({recipe});
    const recipeProp = wrapper.prop('recipeData');

    expect(recipeProp).toBe(recipe.recipeData);
  });

  test('receives the recipeIsLoading piece of state', () => {
    const recipe = {
      recipeIsLoading: true,
    }
    const wrapper = setup({recipe});
    const recipeIsLoadingProp = wrapper.prop('recipeIsLoading');

    expect(recipeIsLoadingProp).toBe(recipe.recipeIsLoading);
  });

  test('receives the recipeError piece of state', () => {
    const recipe = {
      recipeError: 'this is an error message',
    };
    const wrapper = setup({recipe});
    const recipeErrorProp = wrapper.prop('recipeError');

    expect(recipeErrorProp).toBe(recipe.recipeError);
  });

  test('fetchRecipeData is an action creator passed to Recipe as prop', () => {
    const wrapper = setup();
    const fetchRecipeDataProp = wrapper.prop('fetchRecipeData');

    expect(fetchRecipeDataProp).toBeInstanceOf(Function);
  });

  test('deleteRecipe is an action creator passed to Recipe as a prop', () => {
    const wrapper = setup();
    const deleteRecipeProp = wrapper.prop('deleteRecipe');

    expect(deleteRecipeProp).toBeInstanceOf(Function);
  });
});