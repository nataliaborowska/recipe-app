import {createStore} from 'redux'

import {rootReducer, IStoreState} from '../store/store';

export function findByTestAttribute(wrapper: any, dataTestAttribute: string) {
  return wrapper.find(`[data-test='${dataTestAttribute}']`);
}

export function storeFactory(initialState: IStoreState) {
  return createStore(rootReducer, initialState);
}