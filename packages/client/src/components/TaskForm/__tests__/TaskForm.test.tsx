import React from 'react';
import { create } from 'react-test-renderer';
import TaskForm from '../TaskForm';

jest.mock('@material-ui/core/Box', () => 'Box');
jest.mock('@material-ui/icons/CircularProgress', () => 'CircularProgress');
jest.mock('@material-ui/core/TextField', () => 'TextField');
jest.mock('atoms/RoundedButton', () => 'RoundedButton');

const DICTIONARY = {
  BUTTON_TEXT: 'Add',
  TITLE: {
    LABEL: 'Title',
    REQUIRED: 'Title is required',
  },
  DESCRIPTION: {
    LABEL: 'Description',
    HELPER_TEXT: 'HTML syntax is accepted',
    REQUIRED: 'Description is required',
  },
};

describe('Component - TaskForm', () => {
  test('renders correctly', () => {
    const component = create(
      <TaskForm dictionary={DICTIONARY} loading onSubmit={() => {}} />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
