import React from 'react';
import { create } from 'react-test-renderer';

import Login from '../Login';
jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('@material-ui/core/Grid', () => 'Grid');
jest.mock('@material-ui/core/Link', () => 'Link');
jest.mock('@material-ui/core/TextField', () => 'TextField');

jest.mock('../../RoundedButton/', () => 'RoundedButton');

describe('Component - Login', () => {
  test('renders correctly', () => {
    const component = create(<Login />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
