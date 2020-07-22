import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {shallow} from 'enzyme';

import {AccountUnwrapped} from './Account';
import {findByTestAttribute, storeFactory} from '../../testUtils';
import {Firebase, FirebaseContext} from '../../components/Firebase';

const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const firebase = new Firebase();
  const wrapper = shallow(
    <BrowserRouter>
      <FirebaseContext.Consumer>
        {firebase => (
          <AccountUnwrapped store={store} firebase={firebase} />
        )}
      </FirebaseContext.Consumer>
    </BrowserRouter>
  ).shallow().dive().dive().dive();

  return wrapper;
}

test('render without error', () => {
  const wrapper = setup();
  const account = findByTestAttribute(wrapper, 'component-account');

  expect(account.length).toBe(1);
});