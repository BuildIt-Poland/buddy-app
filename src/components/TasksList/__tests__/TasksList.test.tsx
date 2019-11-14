import React from 'react';
import { create } from 'react-test-renderer';

import TasksList from '../TasksList';

jest.mock('components/AvatarHeader', () => 'AvatarHeader');
jest.mock('components/NavBar', () => 'NavBar');

describe('Component - TasksList', () => {
  test('renders correctly', () => {
    const component = create(<TasksList />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
