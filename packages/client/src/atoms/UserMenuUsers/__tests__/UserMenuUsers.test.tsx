import React from 'react';
import { create } from 'react-test-renderer';
import { Newbie } from '@buddy-app/schema';
import UserMenuUsers from 'atoms/UserMenuUsers';

jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('@material-ui/core/Box', () => 'Box');
jest.mock('atoms/UserMenuListItem', () => 'UserMenuListItem');

describe('Component - UserMenuUsers', () => {
  test('renders correctly', () => {
    const component = create(
      <UserMenuUsers
        title='newbies'
        users={[{ name: 'newbie', photo: 'url' }] as Newbie[]}
        onSelect={() => null}
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
