import React from 'react';
import {mount, shallow} from 'enzyme';
import {BrowserRouter} from 'react-router-dom';
import jest from 'jest-mock';

import {Admin, AdminConnected, AdminUnwrapped} from './Admin';
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
        <AdminConnected store={store} />
      </BrowserRouter>
    ).dive().dive().dive().dive();

    return wrapper;
  }

  test('has the fetchingUsers piece of state', () => {
    const auth = {fetchingUsers: true}
    const wrapper = setup({auth});
    const fetchingUsersProp = wrapper.prop('fetchingUsers');

    expect(fetchingUsersProp).toBe(auth.fetchingUsers);
  });

  test('has the users piece of state', () => {
    const auth = {
      users: [{
        email: 'test6@test.com',
        userId: '7bWBhcyFCZZP3VOzHLu2R5MxmMw2',
        username: 'test6@test.com',
      }]
    };
    const wrapper = setup({auth});
    const usersProp = wrapper.prop('users');

    expect(usersProp).toEqual(auth.users);
  });

  test('fetchUsersList action creator is a function prop of Admin', () => {
    const wrapper = setup();
    const fetchUsersListProp = wrapper.prop('fetchUsersList');

    expect(fetchUsersListProp).toBeInstanceOf(Function);
  });

  test('removeUsersList action creator is a function prop of Admin', () => {
    const wrapper = setup();
    const removeUsersListProp = wrapper.prop('removeUsersList');

    expect(removeUsersListProp).toBeInstanceOf(Function);
  });
});

describe('testing lifecycle methods', () => {
  const fetchUsersListMock = jest.fn();
  const removeUsersListMock = jest.fn();

  const props = {
    fetchingUsers: true,
    users: [],
    fetchUsersList: fetchUsersListMock,
    removeUsersList: removeUsersListMock,
  }

  const wrapper = shallow(
    <BrowserRouter>
      <AdminUnwrapped {...props} />
    </BrowserRouter>
  ).dive().dive().dive();


  test('fetchUsersList runs on Admin mount', () => {
    wrapper.instance().componentDidMount();

    const getFetchUsersListCallCount = fetchUsersListMock.mock.calls.length;

    expect(getFetchUsersListCallCount).toBe(1);
  });

  test('removeUsersList on Admin unmount', () => {
    wrapper.instance().componentWillUnmount();

    const getRemoveUsersListCallCount = removeUsersListMock.mock.calls.length;

    expect(getRemoveUsersListCallCount).toBe(1);
  });
});

