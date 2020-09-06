import React from 'react';
import {shallow} from 'enzyme';

import {SuccessModal} from './SuccessModal';
import {findByTestAttribute} from '../../testUtils';

test('renders without error', () => {
  const wrapper = shallow(<SuccessModal />);
  const successModalComponent = findByTestAttribute(wrapper, 'component-success-modal');

  expect(successModalComponent.length).toBe(1);
});