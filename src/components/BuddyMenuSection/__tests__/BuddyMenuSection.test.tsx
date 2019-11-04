import React from 'react';
import { create } from 'react-test-renderer';

import BuddyMenuSection from '../BuddyMenuSection';

jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('@material-ui/core/Box', () => 'Box');
jest.mock('@material-ui/core/ListItem', () => 'ListItem');
jest.mock('../../Avatar', () => 'Avatar');

describe('Component - BuddyMenuSection', () => {
  test('renders correctly', () => {
    const component = create(
      <BuddyMenuSection buddy={{ name: 'Tom', photo: 'photo' }} />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
