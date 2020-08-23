import React from 'react';
import {shallow} from 'enzyme';

import {CreateRecipeForm} from './CreateRecipeForm';
import {findByTestAttribute} from '../../../testUtils';

describe('component and input fields render without error', () => {
  const wrapper = shallow(<CreateRecipeForm />);

  test('CreateRecipeForm component renders without error', () => {
    const createRecipeFormComponent = findByTestAttribute(wrapper, 'component-create-recipe-form');

    expect(createRecipeFormComponent.length).toBe(1);
  });

  test('name input field renders', () => {
    const nameInput = findByTestAttribute(wrapper, 'create-recipe-name');

    expect(nameInput.length).toBe(1);
  });

  test('description input field renders', () => {
    const descriptionInput = findByTestAttribute(wrapper, 'create-recipe-description');

    expect(descriptionInput.length).toBe(1);
  });

  test('servings input field renders', () => {
    const servingsInput = findByTestAttribute(wrapper, 'create-recipe-servings');

    expect(servingsInput.length).toBe(1);
  });

  test('servings input field renders', () => {
    const caloriesInput = findByTestAttribute(wrapper, 'create-recipe-calories');

    expect(caloriesInput.length).toBe(1);
  });

  test('servings input field renders', () => {
    const prepTimeInput = findByTestAttribute(wrapper, 'create-recipe-prep-time');

    expect(prepTimeInput.length).toBe(1);
  });

  test('servings input field renders', () => {
    const cuisineTypeInput = findByTestAttribute(wrapper, 'create-recipe-cuisine-type');

    expect(cuisineTypeInput.length).toBe(1);
  });

  test('servings input field renders', () => {
    const ingredientsInput = findByTestAttribute(wrapper, 'create-recipe-ingredients');

    expect(ingredientsInput.length).toBe(1);
  });

  test('instructions input field renders', () => {
    const instructionsInput = findByTestAttribute(wrapper, 'create-recipe-instructions');

    expect(instructionsInput.length).toBe(1);
  });

  test('submitButton renders', () => {
    const submitButton = findByTestAttribute(wrapper, 'create-recipe-submit-button');

    expect(submitButton.length).toBe(1);
  });
});