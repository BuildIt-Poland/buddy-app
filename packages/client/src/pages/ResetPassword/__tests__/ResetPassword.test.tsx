import React from 'react';
import { create } from 'react-test-renderer';

import ResetPassword from '../ResetPassword';

describe('Component - ResetPassword', () => {
  test('renders correctly', () => {
    const component = create(<ResetPassword />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
