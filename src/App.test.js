import {shallow} from 'enzyme';
import React from 'react';

import {App} from './App';
import {findByTestAttribute} from './testUtils';

const wrapper = shallow(<App />);

test('renders without error', () => {
  const app = findByTestAttribute(wrapper, 'component-app');

  expect(app.length).toBe(1);
});
