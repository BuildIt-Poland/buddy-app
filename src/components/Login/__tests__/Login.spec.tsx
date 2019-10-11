import React from 'react';
import { create } from 'react-test-renderer';

import Login from '../Login';
jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('../../RoundedButton/', () => 'RoundedButton');

describe('Component - Login', () => {
  test('renders correctly', () => {
    const component = create(<Login />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
