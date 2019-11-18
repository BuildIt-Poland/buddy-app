import React from 'react';
import { create } from 'react-test-renderer';

import TasksList from '../TasksList';

jest.mock('@material-ui/core/AppBar', () => 'AppBar');
jest.mock('@material-ui/core/Tabs', () => 'Tabs');
jest.mock('@material-ui/core/Tab', () => 'Tab');
jest.mock('../../TabPanel', () => 'TabPanel');

describe('Component - TasksList', () => {
  test('renders correctly', () => {
    const component = create(<TasksList />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
