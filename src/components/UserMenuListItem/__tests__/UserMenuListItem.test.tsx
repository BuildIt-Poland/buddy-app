import React from 'react';
import { create } from 'react-test-renderer';
import UserMenuListItem from '../UserMenuListItem';

jest.mock('@material-ui/core/ListItem', () => 'ListItem');
jest.mock('@material-ui/core/Box', () => 'Box');
jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('../../Avatar', () => 'Avatar');

describe('Component - UserMenuListItem', () => {
  test('renders correctly', () => {
    const component = create(
      <UserMenuListItem
        user={{ id: 'id', name: 'Tom', photo: 'url' }}
        onItemClick={() => null}
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
