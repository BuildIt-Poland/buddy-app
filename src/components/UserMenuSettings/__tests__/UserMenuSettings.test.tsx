import React from 'react';
import { create } from 'react-test-renderer';

import UserMenuSettings from 'components/UserMenuSettings';

jest.mock('@material-ui/core/List', () => 'List');
jest.mock('@material-ui/core/ListItem', () => 'ListItem');
jest.mock('@material-ui/core/ListSubheader', () => 'ListSubheader');
jest.mock('@material-ui/core/ListItemIcon', () => 'ListItemIcon');
jest.mock('@material-ui/core/ListItemText', () => 'ListItemText');
jest.mock('@material-ui/core/Switch', () => 'Switch');
jest.mock(
  '@material-ui/core/ListItemSecondaryAction',
  () => 'ListItemSecondaryAction'
);
jest.mock('@material-ui/icons/Notifications', () => 'Notifications');
jest.mock('@material-ui/icons/ExitToApp', () => 'ExitToAppIcon');

describe('Component - UserMenuSettings', () => {
  test('renders correctly', () => {
    const component = create(
      <UserMenuSettings
        allowPushedNotifications={true}
        updatePushNotificationsSettings={() => {}}
      />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
