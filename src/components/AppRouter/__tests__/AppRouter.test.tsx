import React from 'react';
import { create } from 'react-test-renderer';

import AppRouter from '../AppRouter';

jest.mock('@material-ui/core/Container', () => 'Container');

describe('Component - AppRouter', () => {
  test('renders correctly', () => {
    const component = create(<AppRouter></AppRouter>);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
