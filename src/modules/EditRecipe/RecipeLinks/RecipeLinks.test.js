import React from 'react';
import {shallow} from 'enzyme';

import {RecipeLinks} from './RecipeLinks';
import {findByTestAttribute} from '../../../testUtils';

test('renders without error', () => {
  const wrapper = shallow(<RecipeLinks />);
  const recipeLinksComponent = findByTestAttribute(wrapper, 'component-recipe-links');

  expect(recipeLinksComponent.length).toBe(1);
});

test('onDeleteClick runs on button click', () => {
  const deleteRecipeDataMock = jest.fn();
  const props = {
    onDeleteClick: deleteRecipeDataMock,
  };
  const wrapper = shallow(<RecipeLinks {...props} />);
  const deleteButton = findByTestAttribute(wrapper, 'delete-button');

  deleteButton.simulate('click', {preventDefault() {} });

  const deleteButtonMockCallCount = deleteRecipeDataMock.mock.calls.length;

  expect(deleteButtonMockCallCount).toBe(1);
});
