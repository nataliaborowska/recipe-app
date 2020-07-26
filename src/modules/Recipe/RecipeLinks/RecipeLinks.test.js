import React from 'react';
import {shallow} from 'enzyme';

import {RecipeLinks} from './RecipeLinks';
import {findByTestAttribute} from '../../../testUtils';

test('renders without error', () => {
  const wrapper = shallow(<RecipeLinks />);
  const recipeLinksComponent = findByTestAttribute(wrapper, 'component-recipe-links');

  expect(recipeLinksComponent.length).toBe(1);
});

test('deleteRecipe action creator call on clicking delete recipe button', () => {
  const deleteRecipeDataMock = jest.fn();
  const recipeId = 'testRecipeId';
  const props = {
    onDeleteClick: deleteRecipeDataMock,
  }
  const wrapper = shallow(
    <RecipeLinks {...props} />
  );
  const button = findByTestAttribute(wrapper, 'recipe-links-button');

  button.simulate('click', {preventDefault() {} });

  const deleteRecipeDataMockCallCount = deleteRecipeDataMock.mock.calls.length;

  expect(deleteRecipeDataMockCallCount).toBe(1);
});
