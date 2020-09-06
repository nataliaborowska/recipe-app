import React from 'react';
import {shallow} from 'enzyme';

import {ErrorModal} from './ErrorModal';
import {findByTestAttribute} from '../../testUtils';

test('renders without error', () => {
  const wrapper = shallow(<ErrorModal />);
  const errorModalComponent = findByTestAttribute(wrapper, 'component-error-modal');

  expect(errorModalComponent.length).toBe(1);
});