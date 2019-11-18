import React from 'react';
import { create } from 'react-test-renderer';

import UserMenuBuddy from '../UserMenuBuddy';

jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('@material-ui/core/Box', () => 'Box');
jest.mock('../../UserMenuListItem', () => 'UserMenuListItem');

describe('Component - UserMenuBuddy', () => {
  test('renders correctly', () => {
    const component = create(
      <UserMenuBuddy
        buddy={{ id: 'id', name: 'Tom', photo: 'photo' }}
        onSelect={() => null}
      />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
