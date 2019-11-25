import React from 'react';
import { create } from 'react-test-renderer';
import UserDetails from 'components/UserDetails';

jest.mock('@material-ui/core/Box', () => 'Box');
jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('components/Avatar', () => 'Avatar');

describe('Component - UserDetails', () => {
  test('renders correctly', () => {
    const component = create(<UserDetails />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
