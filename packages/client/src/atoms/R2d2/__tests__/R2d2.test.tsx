import React from 'react';
import { create } from 'react-test-renderer';

import R2d2 from '../R2d2';

describe('Component - R2d2', () => {
  test('renders correctly', () => {
    const component = create(<R2d2 />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
