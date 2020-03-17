import React from 'react';
import { create } from 'react-test-renderer';

import AddTasksButton from '../AddTasksButton';

jest.mock('@material-ui/core/Fab', () => 'Fab');
jest.mock('@material-ui/icons/Add', () => 'AddIcon');

describe('Component - AddTasksButton', () => {
  test('renders correctly', () => {
    const component = create(<AddTasksButton />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
