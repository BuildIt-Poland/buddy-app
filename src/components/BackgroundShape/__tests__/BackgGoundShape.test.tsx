import React from 'react';
import { create } from 'react-test-renderer';

import BackGroundShape from '../BackGroundShape';

describe('Component - BackGroundShape', () => {
  test('renders correctly', () => {
    const component = create(<BackGroundShape />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
