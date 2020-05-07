import React from 'atoms/R2d2/__tests__/node_modules/react';
import { create } from 'atoms/R2d2/__tests__/node_modules/react-test-renderer';

import R2d2 from '../R2d2';

describe('Component - R2d2', () => {
  test('renders correctly', () => {
    const component = create(<R2d2 />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
