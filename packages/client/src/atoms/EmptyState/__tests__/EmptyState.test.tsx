import React from 'react';
import { create } from 'react-test-renderer';

import EmptyState from '../EmptyState';

jest.mock('@material-ui/core/Box', () => 'Box');
jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('atoms/R2d2', () => 'R2d2');

describe('Component - EmptyState', () => {
  test('renders correctly', () => {
    const component = create(<EmptyState />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
