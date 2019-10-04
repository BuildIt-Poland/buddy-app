import React from 'react';
import { create } from 'react-test-renderer';

import Another from '../another';

describe('Component - another', () => {
  test('renders correctly', () => {
    const component = create(<Another />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
