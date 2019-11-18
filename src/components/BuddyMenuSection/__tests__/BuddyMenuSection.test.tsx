import React from 'react';
import { create } from 'react-test-renderer';

import BuddyMenuSection from '../BuddyMenuSection';

jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('@material-ui/core/Box', () => 'Box');
jest.mock('../../UserMenuListItem', () => 'UserMenuListItem');

describe('Component - BuddyMenuSection', () => {
  test('renders correctly', () => {
    const component = create(
      <BuddyMenuSection
        buddy={{ id: 'id', name: 'Tom', photo: 'photo' }}
        onSelect={() => null}
      />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
