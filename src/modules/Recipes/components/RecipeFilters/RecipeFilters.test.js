import React from 'react';
import {shallow} from 'enzyme';

import {RecipeFilters} from './RecipeFilters';
import {findByTestAttribute} from '../../../../testUtils';

test('renders without errors', () => {
  const props = {
    cuisineNamesList: ['Italian', 'Polish'],
    ingredientsList: ['ingredient1', 'ingredient2', 'ingredient3'],
    recipeNamesList: ['test recipe 1', 'test recipe 2'],
  };
  const wrapper = shallow(<RecipeFilters {...props} />);
  const recipeFiltersComponent = findByTestAttribute(wrapper, 'component-recipe-filters');

  expect(recipeFiltersComponent.length).toBe(1);
});

describe('testing if filter functions are run on select change', () => {
  const props = {
    cuisineNamesList: ['Italian', 'Polish'],
    ingredientsList: ['ingredient1', 'ingredient2', 'ingredient3'],
    recipeNamesList: ['test recipe 1', 'test recipe 2'],
  };

  test('check if onNameSearch function runs with onChange on name select', () => {
    const onNameSearchMock = jest.fn();
    const wrapper = shallow(<RecipeFilters {...props} onNameSearch={onNameSearchMock} />);
    const nameSelect = findByTestAttribute(wrapper, 'name-search');

    nameSelect.simulate('change');

    const onNameSearchMockCallCount = onNameSearchMock.mock.calls.length;

    expect(onNameSearchMockCallCount).toBe(1);
  });

  test('check if onCuisineSearch function runs with onChange on cuisine select', () => {
    const onCuisineSearchMock = jest.fn();
    const wrapper = shallow(<RecipeFilters {...props} onCuisineSearch={onCuisineSearchMock} />);
    const cuisineSelect = findByTestAttribute(wrapper, 'cuisine-search');

    cuisineSelect.simulate('change');

    const onCuisineSearchMockCallCount = onCuisineSearchMock.mock.calls.length;

    expect(onCuisineSearchMockCallCount).toBe(1);
  });

  test('check if onIngredientsSearch function runs with onChange on ingredients select', () => {
    const onIngredientsSearchMock = jest.fn();
    const wrapper = shallow(<RecipeFilters {...props} onIngredientsSearch={onIngredientsSearchMock} />);
    const ingredientsSelect = findByTestAttribute(wrapper, 'ingredients-search');

    ingredientsSelect.simulate('change');

    const onIngredientsSearchMockCallCount = onIngredientsSearchMock.mock.calls.length;

    expect(onIngredientsSearchMockCallCount).toBe(1);
  });
})