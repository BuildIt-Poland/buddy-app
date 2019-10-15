import React from 'react';
import { create } from 'react-test-renderer';
import NewbieSelect from '../NewbieSelect';

jest.mock('@material-ui/core/AppBar', () => 'AppBar');
jest.mock('@material-ui/core/Toolbar', () => 'Toolbar');
jest.mock('@material-ui/core/IconButton', () => 'IconButton');
jest.mock('../../NavBar');

describe('Component - NewbieSelect', () => {
  test('renders correctly', () => {
    const component = create(<NewbieSelect />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
