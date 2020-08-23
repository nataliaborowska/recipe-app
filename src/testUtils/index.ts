import {act} from 'react-dom/test-utils';
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

export const timeout = (timeout = 0) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};

export async function changeInputValue(wrapper: any, inputDataTest: string, value: string) {
  const inputElement = findByTestAttribute(wrapper, inputDataTest);

  inputElement.find('input').simulate('change', {target: {value}});
  await act(async () => {
    await timeout();
  });

  wrapper.update();
}

export async function changeSelectValue(wrapper: any, selectDataTest: string, value: string) {
  const selectElement = findByTestAttribute(wrapper, selectDataTest);

  // can't manage to simulate a select click and value change
  selectElement.find('.ant-select').simulate('mouseDown');

  // document.getElementsByClassName('.ant-select-item-option')[1].simulate('mouseDown');

  //selectElement.find('.ant-select-selection__rendered').simulate('click');
  //selectElement.find('.ant-select-dropdown-menu li').at(2).simulate('mouseDown');

  await act(async () => {
    await timeout();
  });

  wrapper.update();
}