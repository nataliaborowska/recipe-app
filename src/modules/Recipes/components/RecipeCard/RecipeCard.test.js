import React from 'react';
import {shallow} from 'enzyme';

import {RecipeCardUnwrapped} from './RecipeCard';
import {findByTestAttribute} from '../../../../testUtils';

test('renders without error', () => {
  const wrapper = shallow(<RecipeCardUnwrapped />);
  const recipeCardComponent = findByTestAttribute(wrapper, 'component-recipe-card');

  expect(recipeCardComponent.length).toBeGreaterThanOrEqual(1);
});
