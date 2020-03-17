import React from 'react';
import { create } from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';

import UserMenuSettings from 'atoms/UserMenuSettings';

jest.mock('@material-ui/core/List', () => 'mock-list');
jest.mock('@material-ui/core/ListItem', () => 'mock-list-item');
jest.mock('@material-ui/core/ListSubheader', () => 'mock-list-subheader');
jest.mock('@material-ui/core/ListItemIcon', () => 'mock-list-item-icon');
jest.mock('@material-ui/core/ListItemText', () => 'mock-list-item-text');
jest.mock('@material-ui/core/Switch', () => 'mock-switch');
jest.mock(
  '@material-ui/core/ListItemSecondaryAction',
  () => 'mock-list-item-secondary-action'
);
jest.mock('@material-ui/icons/Notifications', () => 'mock-notifications');
jest.mock('@material-ui/icons/ExitToApp', () => 'mock-exit-to-app-icon');

describe('Component - UserMenuSettings', () => {
  test('renders correctly', () => {
    const component = create(
      <UserMenuSettings
        allowPushedNotifications={true}
        updatePushNotificationsSettings={() => {}}
        onLogoutClick={() => {}}
      />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  describe('when logout button is clicked', () => {
    const onLogoutMock = jest.fn();
    it('should call logout callback', () => {
      const { getByTestId } = render(
        <UserMenuSettings
          allowPushedNotifications={true}
          updatePushNotificationsSettings={() => {}}
          onLogoutClick={onLogoutMock}
        />
      );

      fireEvent.click(getByTestId('user-menu-logout-btn'));
      expect(onLogoutMock).toHaveBeenCalledTimes(1);
    });
  });
});
