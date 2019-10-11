import React from 'react';
import { create } from 'react-test-renderer';

import ErrorPage from '../ErrorPage';

describe('Component - ErrorPage', () => {
  test('renders correctly', () => {
    const component = create(<ErrorPage />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
