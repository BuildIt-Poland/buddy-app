import React from 'react';
import { create } from 'react-test-renderer';

import ForgotPassword from '../ForgotPassword';

describe('Component - ForgotPassword', () => {
  test('renders correctly', () => {
    const component = create(<ForgotPassword />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
