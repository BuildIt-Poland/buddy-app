import React from 'react';
import { create } from 'react-test-renderer';

import TasksList from '../TasksList';

describe('Component - TasksList', () => {
  test('renders correctly', () => {
    const component = create(<TasksList />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
