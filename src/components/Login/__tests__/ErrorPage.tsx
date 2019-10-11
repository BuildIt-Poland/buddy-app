import React from 'react';
import { create } from 'react-test-renderer';

import Login from '../Login';

describe('Component - Login', () => {
  test('renders correctly', () => {
    const component = create(<Login />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
