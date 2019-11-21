import React from 'react';
import { create } from 'react-test-renderer';
import UserMenuDetails from 'components/UserMenuDetails';

jest.mock('@material-ui/core/Box', () => 'Box');
jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('components/Avatar', () => 'Avatar');

describe('Component - PlusButton', () => {
  test('renders correctly', () => {
    const component = create(
      <UserMenuDetails
        user={{ name: 'tom', email: 'hanks@wipro.com', photo: 'url' }}
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
