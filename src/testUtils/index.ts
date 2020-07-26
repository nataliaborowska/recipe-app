import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {rootReducer, IStoreState} from '../store/store';

export function findByTestAttribute(wrapper: any, dataTestAttribute: string) {
  return wrapper.find(`[data-test='${dataTestAttribute}']`);
}

export function storeFactory(initialState: IStoreState) {
  const createdStore = createStore(rootReducer, initialState, applyMiddleware(thunk));

  return createdStore;
}