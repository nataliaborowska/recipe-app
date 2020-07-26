import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {shallow} from 'enzyme';

import {EditRecipeUnwrapped, EditRecipeConnected} from './EditRecipe';
import {findByTestAttribute, storeFactory} from '../../testUtils';

test('renders without error', () => {
  const setup = (initialState = {}) => {
    const store = storeFactory();
    const props = {
      match: {
        params: {
          recipeId: 'testRecipeId',
        },
      },
    };
    const wrapper = shallow(
      <BrowserRouter>
        <EditRecipeUnwrapped {...props} store={store} />
      </BrowserRouter>
    ).dive().dive().dive();

    return wrapper;
  }
  const wrapper = setup();
  const editRecipeComponent = findByTestAttribute(wrapper, 'component-edit-recipe')

  expect(editRecipeComponent.length).toBe(1);
});

describe('component gets all of the props', () => {
  let setup;

  beforeEach(() => {
    setup = (initialState = {}) => {
      const store = storeFactory(initialState);
      const wrapper = shallow(
        <BrowserRouter>
          <EditRecipeConnected store={store} />
        </BrowserRouter>
      ).dive().dive().dive().dive();

      return wrapper;
    }
  });

  test('component gets editRecipeSuccess piece of state', () => {
    const recipe = {
      recipeSuccess: true,
    }
    const wrapper = setup({recipe});
    const editRecipeSuccessProp = wrapper.prop('editRecipeSuccess');

    expect(editRecipeSuccessProp).toEqual(recipe.recipeSuccess);
  });

  test('component gets recipeData piece of state', () => {
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
    const recipeDataProp = wrapper.prop('recipeData');

    expect(recipeDataProp).toEqual(recipe.recipeData);
  });

  test('component gets recipeError piece of state', () => {
    const recipe = {
      recipeError: 'this is an error message',
    }
    const wrapper = setup({recipe});
    const recipeErrorProp = wrapper.prop('recipeError');

    expect(recipeErrorProp).toEqual(recipe.recipeError);
  });

  test('component gets recipeIsLoading piece of state', () => {
    const recipe = {
      recipeIsLoading: true,
    };
    const wrapper = setup({recipe});
    const recipeIsLoadingProp = wrapper.prop('recipeIsLoading');

    expect(recipeIsLoadingProp).toEqual(recipe.recipeIsLoading);
  });

  test('deleteRecipe is an action creator passed as prop to EditRecipe', () => {
    const wrapper = setup();
    const deleteRecipeProp = wrapper.prop('deleteRecipe');

    expect(deleteRecipeProp).toBeInstanceOf(Function);
  });

  test('editRecipe is an action creator passed as prop to EditRecipe', () => {
    const wrapper = setup();
    const editRecipeProp = wrapper.prop('editRecipe');

    expect(editRecipeProp).toBeInstanceOf(Function);
  });

  test('editRecipeEnd is an action creator passed as prop to EditRecipe', () => {
    const wrapper = setup();
    const editRecipeEndProp = wrapper.prop('editRecipeEnd');

    expect(editRecipeEndProp).toBeInstanceOf(Function);
  });

  test('editRecipeFail is an action creator passed as prop to EditRecipe', () => {
    const wrapper = setup();
    const editRecipeFailProp = wrapper.prop('editRecipeFail');

    expect(editRecipeFailProp).toBeInstanceOf(Function);
  });

  test('fetchRecipeData is an action creator passed as prop to EditRecipe', () => {
    const wrapper = setup();
    const fetchRecipeDataProp = wrapper.prop('fetchRecipeData');

    expect(fetchRecipeDataProp).toBeInstanceOf(Function);
  });
});

describe('testing action creator calls', () => {
  const fetchRecipeDataMock = jest.fn();
  const props = {
    editRecipeSuccess: 'true',
    fetchRecipeData: fetchRecipeDataMock,
    recipeData: {},
    recipeError: '',
    recipeIsLoading: true,
    match: {
      params: {
        recipeId: 'testRecipeId',
      },
    },
  };
  const wrapper = shallow(
    <BrowserRouter>
      <EditRecipeUnwrapped {...props} />
    </BrowserRouter>
  ).dive().dive().dive();

  test('fetchRecipeData action creator gets called on mount', () => {
    wrapper.instance().componentDidMount();

    const fetchRecipeDataCallCount = fetchRecipeDataMock.mock.calls.length;

    expect(fetchRecipeDataCallCount).toBe(1);
  });
});
