import React from 'react';
import { create } from 'react-test-renderer';
import TaskForm from '../TaskForm';

jest.mock('@material-ui/core/Box', () => 'Box');
jest.mock('@material-ui/core/CircularProgress', () => 'CircularProgress');
jest.mock('@material-ui/core/TextField', () => 'TextField');
jest.mock('atoms/RoundedButton', () => 'RoundedButton');

describe('Component - TaskForm', () => {
  test('renders correctly', () => {
    const component = create(<TaskForm loading onSubmit={() => {}} />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
