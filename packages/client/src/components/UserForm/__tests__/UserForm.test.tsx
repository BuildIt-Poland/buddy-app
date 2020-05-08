import React from 'react';
import { create } from 'react-test-renderer';
import UserForm from '../UserForm';

jest.mock('@material-ui/core/CircularProgress', () => 'CircularProgress');
jest.mock('@material-ui/core/TextField', () => 'TextField');
jest.mock('atoms/RoundedButton', () => 'RoundedButton');

describe('Component - UserForm', () => {
  test('renders correctly', () => {
    const component = create(<UserForm loading onSubmit={() => {}} />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
