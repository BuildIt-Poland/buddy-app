import React from 'react';
import { create } from 'react-test-renderer';

import App from '../App';

jest.mock('@material-ui/core/CssBaseline', () => 'CssBaseline');
jest.mock('@material-ui/styles/ThemeProvider', () => 'ThemeProvider');
jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('../../../styles/theme.ts', () => {});
jest.mock('../../AppWrapper', () => 'AppWrapper');

describe('Component - App', () => {
  test('renders correctly', () => {
    const component = create(<App />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
