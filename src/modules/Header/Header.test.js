import React from 'react';
import {shallow} from 'enzyme';

import {HeaderUnwrapped, Header} from './Header';
import {findByTestAttribute, storeFactory} from '../../testUtils';
import {Descriptions} from 'antd';

test('renders without error', () => {
  const wrapper = shallow(<HeaderUnwrapped />);
  const headerComponent = findByTestAttribute(wrapper, 'component-header');

  expect(headerComponent.length).toBe(1);
});

describe('component gets props from redux store', () => {
  let setup;
  beforeEach(() => {
    setup = (initialStore = {}) => {
      const store = storeFactory(initialStore);
      const wrapper = shallow(<Header store={store} />).dive();

      return wrapper;
    }
  });

  test('component gets authenticatedUser piece of state as props', () => {
    const auth = {
      authenticatedUser: {
        email: 'test@gmail.com',
        userId: 'testUserId',
        username: 'testUsername',
      },
    }
    const wrapper = setup({auth});
    const authenticatedUserProp = wrapper.prop('authenticatedUser');

    expect(authenticatedUserProp).toEqual(auth.authenticatedUser);
  });

  test('component gets isAuthenticated piece of state', () => {
    const auth = {
      isAuthenticated: true,
    };
    const wrapper = setup({auth});
    const isAuthenticatedProp = wrapper.prop('isAuthenticated');

    expect(isAuthenticatedProp).toEqual(auth.isAuthenticated);
  });

  test('signOut is an action creator passed as prop to Header', () => {
    const wrapper = setup();
    const signOutProp = wrapper.prop('signOut');

    expect(signOutProp).toBeInstanceOf(Function);
  });
});