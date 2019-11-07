import React from 'react';
import { create } from 'react-test-renderer';

import TaskCheckbox from '../TaskCheckbox';

jest.mock('@material-ui/core/Box', () => 'Box');

describe('Component - TaskCheckbox', () => {
  test('renders correctly', () => {
    const component = create(<TaskCheckbox />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
