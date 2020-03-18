import React from 'react';
import { create } from 'react-test-renderer';

import AddTaskOptions from '../AddTaskOptions';

jest.mock('@material-ui/core/Fab', () => 'Fab');
jest.mock('@material-ui/icons/Add', () => 'AddIcon');

describe('Component - AddTaskOptions', () => {
  test('renders correctly', () => {
    const component = create(<AddTaskOptions />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
