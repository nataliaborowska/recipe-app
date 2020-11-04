import {RecipeActionTypesEnum} from '../actions/recipeActions/typesEnum';
import {recipeReducer} from './recipeReducer';

describe('', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      filterByCuisine: [],
      filterByIngredients: [],
      filterByName: [],
      recipeError: null,
      recipeSuccess: false,
      recipeIsLoading: false,
      recipeId: null,
      recipeData: null,
      recipesList: [],
    };
  });

  test('recipeReducer returns initialState when no action is passed', () => {
    const newState = recipeReducer(initialState, {});

    expect(newState).toEqual(initialState);
  });

  describe('recipe reducer returns a specific piece of state when action type CREATE_RECIPE_END or EDIT_RECIPE_END is recived', () => {
    let state;

    beforeEach(() => {
      state = {
        ...initialState,
        recipeError: null,
        recipeSuccess: false,
      }
    });

    test('recipe reducer returns a specific state when action type CREATE_RECIPE_END is recived', () => {
      const newState = recipeReducer(initialState, {type: RecipeActionTypesEnum.CREATE_RECIPE_END});

      expect(newState).toEqual(state);
    });

    test('recipe reducer returns a specific state when action type EDIT_RECIPE_END is recived', () => {
      const newState = recipeReducer(initialState, {type: RecipeActionTypesEnum.EDIT_RECIPE_END});

      expect(newState).toEqual(state);
    });
  });

  describe('recipe reducer returns a specific state when action type CREATE_RECIPE_FAIL or EDIT_RECIPE_FAIL or DELETE_RECIPE_FAIL is recived', () => {
    let state;
    const recipeError = 'recipe error';

    beforeEach(() => {
      state = {
        ...initialState,
        recipeError: recipeError,
        recipeIsLoading: false,
      }
    });

    test('recipe reducer returns a specific state when action type CREATE_RECIPE_FAIL is recived', () => {
      const newState = recipeReducer(initialState, {
        type: RecipeActionTypesEnum.CREATE_RECIPE_FAIL,
        recipeError,
      });

      expect(newState).toEqual(state);
    });

    test('recipe reducer returns a specific state when action type EDIT_RECIPE_FAIL is recived', () => {
      const newState = recipeReducer(initialState, {
        type: RecipeActionTypesEnum.EDIT_RECIPE_FAIL,
        recipeError,
      });

      expect(newState).toEqual(state);
    });

    test('recipe reducer returns a specific state when action type DELETE_RECIPE_FAIL is recived', () => {
      const newState = recipeReducer(initialState, {
        type: RecipeActionTypesEnum.DELETE_RECIPE_FAIL,
        recipeError,
      });

      expect(newState).toEqual(state);
    });
  });

  test('recipe reducer returns a specific state when action CREATE_RECIPE_SUCCESS is reciped', () => {
    const recipeId = 'recipeId';
    const state = {
      ...initialState,
      recipeError: null,
      recipeIsLoading: false,
      recipeId,
      recipeSuccess: true,
    }

    const newState = recipeReducer(initialState, {
      type: RecipeActionTypesEnum.CREATE_RECIPE_SUCCESS,
      recipeId,
    });

    expect(newState).toEqual(state);
  });

  test('recipe reducer returns a specific state when action EDIT_RECIPE_SUCCESS is reciped', () => {
    const state = {
      ...initialState,
      recipeError: null,
      recipeIsLoading: false,
      recipeSuccess: true,
    }

    const newState = recipeReducer(initialState, {type: RecipeActionTypesEnum.EDIT_RECIPE_SUCCESS});

    expect(newState).toEqual(state);
  });

  describe('recipe reducer returns a specific state when action CREATE_RECIPE_START or EDIT_RECIPE_START or DELETE_RECIPE_START is received', () => {
    let state;

    beforeEach(() => {
      state = {
        ...initialState,
        recipeError: null,
        recipeIsLoading: true,
      }
    });

    test('recipe reducer returns a specific state when action CREATE_RECIPE_START is received', () => {
      const newState = recipeReducer(initialState, {type: RecipeActionTypesEnum.CREATE_RECIPE_START});

      expect(newState).toEqual(state);
    });

    test('recipe reducer returns a specific state when action EDIT_RECIPE_START is received', () => {
      const newState = recipeReducer(initialState, {type: RecipeActionTypesEnum.EDIT_RECIPE_START});

      expect(newState).toEqual(state);
    });

    test('recipe reducer returns a specific state when action DELETE_RECIPE_START is received', () => {
      const newState = recipeReducer(initialState, {type: RecipeActionTypesEnum.DELETE_RECIPE_START});

      expect(newState).toEqual(state);
    });
  });

  test('recipe reducer returns a specific state when action DELETE_RECIPE_SUCCESS is received', () => {
    const state = {
      ...initialState,
      recipeIsLoading: false,
    }
    const newState = recipeReducer(initialState, {type: RecipeActionTypesEnum.DELETE_RECIPE_SUCCESS});

    expect(newState).toEqual(state);
  });

  test('recipe reducer returns a specific state when action FETCH_RECIPE_START is received', () => {
    const state = {
      ...initialState,
      recipeError: null,
    }
    const newState = recipeReducer(initialState, {type: RecipeActionTypesEnum.FETCH_RECIPE_START});

    expect(newState).toEqual(state);
  });

  test('recipe reducer returns a specific state when action FETCH_RECIPE_SUCCESS is received', () => {
    const recipeData = {};
    const state = {
      ...initialState,
      recipeError: null,
      recipeData: recipeData,
    }
    const newState = recipeReducer(initialState, {
      type: RecipeActionTypesEnum.FETCH_RECIPE_SUCCESS,
      recipeData,
    });

    expect(newState).toEqual(state);
  });

  test('recipe reducer returns a specific state when action FETCH_RECIPE_FAIL is received', () => {
    const recipeError = 'recipe error';
    const state = {
      ...initialState,
      recipeError: recipeError,
    }
    const newState = recipeReducer(initialState, {
      type: RecipeActionTypesEnum.FETCH_RECIPE_FAIL,
      recipeError,
    });

    expect(newState).toEqual(state);
  });

  test('recipe reducer returns a specific state when action FETCH_RECIPES_LIST_START is received', () => {
    const state = {
      ...initialState,
      recipeError: null,
    }
    const newState = recipeReducer(initialState, {type: RecipeActionTypesEnum.FETCH_RECIPES_LIST_START});

    expect(newState).toEqual(state);
  });

  test('recipe reducer returns a specific state when action FETCH_RECIPES_LIST_SUCCESS is received', () => {
    const recipesList = [];
    const state = {
      ...initialState,
      recipeError: null,
      recipesList,
    }
    const newState = recipeReducer(initialState, {
      type: RecipeActionTypesEnum.FETCH_RECIPES_LIST_SUCCESS,
      recipesList,
    });

    expect(newState).toEqual(state);
  });

  test('recipe reducer returns a specific state when action FETCH_RECIPES_LIST_FAIL is received', () => {
    const recipeError = '';
    const state = {
      ...initialState,
      recipeError,
    }
    const newState = recipeReducer(initialState, {
      type: RecipeActionTypesEnum.FETCH_RECIPES_LIST_FAIL,
      recipeError,
    });

    expect(newState).toEqual(state);
  });

  test('recipe reducer returns a specific state when action REMOVE_RECIPES_LIST_END is received', () => {
    const state = {
      ...initialState,
      recipesList: [],
    }
    const newState = recipeReducer(initialState, {type: RecipeActionTypesEnum.REMOVE_RECIPES_LIST_END});

    expect(newState).toEqual(state);
  });

  test('recipe reducer returns a specific state when action SET_RECIPE_FILTERS is received', () => {
    const filterByCuisine = ['cuisine1'];
    const filterByName = ['recipe1'];
    const filterByIngredients = ['ingredient1', 'ingredient2'];
    const state = {
      ...initialState,
      filterByCuisine,
      filterByIngredients,
      filterByName,
    }
    const newState = recipeReducer(initialState, {
      type: RecipeActionTypesEnum.SET_RECIPE_FILTERS,
      filterByCuisine,
      filterByName,
      filterByIngredients,
    });

    expect(newState).toEqual(state);
  });
});