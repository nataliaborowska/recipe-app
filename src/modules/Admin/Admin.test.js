import React from 'react';
import {shallow} from 'enzyme';
import {BrowserRouter} from 'react-router-dom';

import {Admin, AdminUnwrapped} from './Admin';
import {findByTestAttribute, storeFactory} from '../../testUtils';

describe('rendering', () => {
  const setup = (initialState = {}) => {
    const store = storeFactory(initialState);
    const wrapper = shallow(
      <BrowserRouter>
        <AdminUnwrapped store={store} />
      </BrowserRouter>
    ).shallow().dive().dive();

    return wrapper;
  }

  test('render without error', () => {
    const wrapper = setup();
    const adminComponent = findByTestAttribute(wrapper, 'component-admin');

    expect(adminComponent.length).toBe(1);
  });
})

describe('gets all of the props', () => {
  const setup = (initialState = {}) => {
    const store = storeFactory(initialState);
    const wrapper = shallow(
      <BrowserRouter>
        <Admin store={store} />
      </BrowserRouter>
    ).shallow().dive().dive().dive().dive().dive().dive();

    return wrapper;
  }

  test("has the fetchingUsers piece of state", () => {
    const auth = {auth: {fetchingUsers: true}}
    const wrapper = setup({auth});
    // //const adminProp = wrapper.instance().props.fetchingUsers;

    console.warn(wrapper.debug());

    //expect(adminProp).toBe(fetchingUsers);
  });
});

