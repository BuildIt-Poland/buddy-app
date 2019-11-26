import React from 'react';
import { create } from 'react-test-renderer';
import UserDetails from 'components/UserDetails';
import { mockBasicUserDetails } from '__mocks__';

jest.mock('@material-ui/core/Box', () => 'Box');
jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('@material-ui/core/Link', () => 'Link');

jest.mock('@material-ui/core/TextareaAutosize', () => 'TextareaAutosize');
jest.mock('components/Avatar', () => 'Avatar');

describe('Component - UserDetails', () => {
  test('renders correctly', () => {
    const component = create(<UserDetails details={mockBasicUserDetails} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
