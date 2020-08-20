import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {shallow} from 'enzyme';

import {CreateRecipeConnected, CreateRecipeUnwrapped} from './CreateRecipe';
import {findByTestAttribute, storeFactory} from '../../testUtils';

test('renders without error', () => {
  const setup = (initialStore = {}) => {
    const store = storeFactory();
    const wrapper = shallow(
      <BrowserRouter>
        <CreateRecipeUnwrapped store={store} />
      </BrowserRouter>
    ).dive().dive().dive();

    return wrapper;
  }
  const wrapper = setup();
  const createRecipeComponent = findByTestAttribute(wrapper, 'component-create-recipe');

  expect(createRecipeComponent.length).toBe(1);
});

describe('component recives all of the props', () => {
  let setup;

  beforeEach(() => {
    setup = (initialState = {}) => {
      const store = storeFactory(initialState);
      const wrapper = shallow(
        <BrowserRouter>
          <CreateRecipeConnected store={store} />
        </BrowserRouter>
      ).dive().dive().dive().dive();

      return wrapper;
    }
  });

  test('component gets createRecipeSuccessPiece of state', () => {
    const recipe = {
      recipeSuccess: true,
    };
    const wrapper = setup({recipe});
    const createRecipeSuccessProp = wrapper.prop('createRecipeSuccess');

    expect(createRecipeSuccessProp).toEqual(recipe.recipeSuccess);
  });

  test('component gets recipeId piece of state', () => {
    const recipe = {
      recipeId: 'testID',
    };
    const wrapper = setup({recipe});
    const recipeIdProp = wrapper.prop('recipeId');

    expect(recipeIdProp).toEqual(recipe.recipeId);
  });

  test('component gets recipeError piece of state', () => {
    const recipe = {
      recipeError: 'test recipeError in CreateRecipe component',
    };
    const wrapper = setup({recipe});
    const recipeErrorProp = wrapper.prop('recipeError');

    expect(recipeErrorProp).toEqual(recipe.recipeError);
  });

  test('component gets recipeIsLoadingPiece of state', () => {
    const recipe = {
      recipeIsLoading: true,
    }
    const wrapper = setup({recipe});
    const recipeIsLoadingProp = wrapper.prop('recipeIsLoading');

    expect(recipeIsLoadingProp).toEqual(recipe.recipeIsLoading);
  });

  test('createRecipe action creator gets passed as prop to CreateRecipe', () => {
    const wrapper = setup();
    const createRecipeProp = wrapper.prop('createRecipe');

    expect(createRecipeProp).toBeInstanceOf(Function);
  });

  test('createRecipeEnd action creator gets passed as prop to CreateRecipe', () => {
    const wrapper = setup();
    const createRecipeEndProp = wrapper.prop('createRecipeEnd');

    expect(createRecipeEndProp).toBeInstanceOf(Function);
  });

  test('createRecipeFail action creator gets passed as prop to CreateRecipe', () => {
    const wrapper = setup();
    const createRecipeFailProp = wrapper.prop('createRecipeFail');

    expect(createRecipeFailProp).toBeInstanceOf(Function);
  });
});
