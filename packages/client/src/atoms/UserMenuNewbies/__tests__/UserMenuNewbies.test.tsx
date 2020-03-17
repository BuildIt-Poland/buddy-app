import React from 'react';
import { create } from 'react-test-renderer';
import { Newbie } from '@buddy-app/schema';
import UserMenuNewbies from 'atoms/UserMenuNewbies';

jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('@material-ui/core/Box', () => 'Box');
jest.mock('components/UserMenuListItem', () => 'UserMenuListItem');

describe('Component - UserMenuNewbies', () => {
  test('renders correctly', () => {
    const component = create(
      <UserMenuNewbies
        newbies={[{ name: 'newbie', photo: 'url' }] as Newbie[]}
        onSelect={() => null}
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
