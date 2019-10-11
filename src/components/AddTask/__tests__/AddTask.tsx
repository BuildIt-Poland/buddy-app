import React from 'react';
import { create } from 'react-test-renderer';

import AddTask from '../AddTask';

describe('Component - AddTask', () => {
  test('renders correctly', () => {
    const component = create(<AddTask />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
