import React from 'react';
import {shallow} from 'enzyme';
import {BrowserRouter} from 'react-router-dom';

import {BreadCrumbWrapper} from './BreadCrumbWrapper';
import {findByTestAttribute} from '../../testUtils';

test('renders without error', () => {
  const wrapper = shallow(
    <BrowserRouter>
      <BreadCrumbWrapper />
    </BrowserRouter>
  ).dive().dive().dive().dive().dive();

  const breadCrumbWrapperComponent = findByTestAttribute(wrapper, 'component-breadcrumb-wrapper');

  expect(breadCrumbWrapperComponent.length).toBe(1);
});