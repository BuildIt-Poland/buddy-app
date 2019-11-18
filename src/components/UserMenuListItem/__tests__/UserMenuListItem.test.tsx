import React from 'react';
import { create } from 'react-test-renderer';
import UserMenuListItem from 'components/UserMenuListItem';
import { Newbie } from 'buddy-app-schema';
import { mockSchemaTypes } from '__mocks__';

jest.mock('@material-ui/core/ListItem', () => 'ListItem');
jest.mock('@material-ui/core/Box', () => 'Box');
jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('components/Avatar', () => 'Avatar');
jest.mock('buddy-app-schema', () => mockSchemaTypes());

describe('Component - UserMenuListItem', () => {
  test('renders correctly', () => {
    const onClickSpy = jest.fn();
    const userMock = {
      id: 'id',
      name: 'Tom',
      photo: 'url',
      email: 'tom@wipro.com',
      role: mockSchemaTypes().UserRole.Newbie,
      allowPushedNotifications: false,
    };
    const component = create(
      <UserMenuListItem user={userMock as Newbie} onItemClick={onClickSpy} />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
