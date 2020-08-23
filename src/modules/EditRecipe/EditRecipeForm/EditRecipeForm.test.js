import React from 'react';
import {mount, shallow} from 'enzyme';

import {EditRecipeForm} from './EditRecipeForm';
import {findByTestAttribute, timeout, changeInputValue, changeSelectValue} from '../../../testUtils';

describe('component and input fields render without error', () => {
  const wrapper = shallow(<EditRecipeForm />);

  test('edit recipe form renders without error', () => {
    const editRecipeFormComponent = findByTestAttribute(wrapper, 'component-edit-recipe-form');

    expect(editRecipeFormComponent.length).toBe(1);
  });

  test('name input field renders', () => {
    const nameInput = findByTestAttribute(wrapper, 'edit-recipe-name');

    expect(nameInput.length).toBe(1);
  });

  test('description input field renders', () => {
    const descriptionInput = findByTestAttribute(wrapper, 'edit-recipe-description');

    expect(descriptionInput.length).toBe(1);
  });

  test('servings input field renders', () => {
    const servingsInput = findByTestAttribute(wrapper, 'edit-recipe-servings');

    expect(servingsInput.length).toBe(1);
  });

  test('servings input field renders', () => {
    const caloriesInput = findByTestAttribute(wrapper, 'edit-recipe-calories');

    expect(caloriesInput.length).toBe(1);
  });

  test('servings input field renders', () => {
    const prepTimeInput = findByTestAttribute(wrapper, 'edit-recipe-prep-time');

    expect(prepTimeInput.length).toBe(1);
  });

  test('servings input field renders', () => {
    const cuisineTypeInput = findByTestAttribute(wrapper, 'edit-recipe-cuisine-type');

    expect(cuisineTypeInput.length).toBe(1);
  });

  test('servings input field renders', () => {
    const ingredientsInput = findByTestAttribute(wrapper, 'edit-recipe-ingredients');

    expect(ingredientsInput.length).toBe(1);
  });

  test('instructions input field renders', () => {
    const instructionsInput = findByTestAttribute(wrapper, 'edit-recipe-instructions');

    expect(instructionsInput.length).toBe(1);
  });

  test('submitButton renders', () => {
    const submitButton = findByTestAttribute(wrapper, 'edit-recipe-submit-button');

    expect(submitButton.length).toBe(1);
  });
});

describe('testing action creators', () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }))
    });
  });

  test('onFormSubmitFailed running when no field is filled', async () => {
    const formSubmitMock = jest.fn();
    const formSubmitFailMock = jest.fn();
    const formFieldChangeMock = jest.fn();
    const props = {
      onFormSubmit: formSubmitMock,
      onFormSubmitFailed: formSubmitFailMock,
      onFormFieldsChange: formFieldChangeMock,
    }
    const wrapper = mount(<EditRecipeForm {...props} />);

    wrapper.find('form').simulate('submit', {preventDefault() {} });
    await timeout();
    wrapper.update();

    const formSubmitMockCalls = formSubmitFailMock.mock.calls.length;

    expect(formSubmitMockCalls).toBe(1);
  });

  //I have a problem to simulate a select click and value change so this is commented out for now
  // test('onFormSubmit running when all required fields are filled', async () => {
  //   const formSubmitMock = jest.fn();

  //   const props = {
  //     onFormSubmit: formSubmitMock,
  //   }
  //   const wrapper = mount(<EditRecipeForm {...props} />);

  //   changeInputValue(wrapper, 'edit-recipe-name', 'test name');
  //   changeInputValue(wrapper, 'edit-recipe-description', 'test description');
  //   changeInputValue(wrapper, 'edit-recipe-servings', '2');
  //   changeInputValue(wrapper, 'edit-recipe-calories', '2000');
  //   changeInputValue(wrapper, 'edit-recipe-prep-time', '20');
  //   changeSelectValue(wrapper, 'edit-recipe-cuisine-type', 'italian');

  //   // const editRecipeCuisineType = findByTestAttribute('edit-recipe-cuisine-type', wrapper);
  //   // const editRecipeIngredients = findByTestAttribute('edit-recipe-ingredients', wrapper);
  //   // const editRecipeInstructions = findByTestAttribute('edit-recipe-instructions', wrapper);
  //   // const editRecipeStep = findByTestAttribute('edit-recipe-step', wrapper);

  //   wrapper.find('form').simulate('submit', {preventDefault() {} });
  //   await timeout();
  //   wrapper.update();

  //   const formSubmitMockCalls = formSubmitMock.mock.calls.length;

  //   //expect(formSubmitMockCalls).toBe(1);
  // });
});