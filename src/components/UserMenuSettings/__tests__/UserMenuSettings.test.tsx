import React from 'react';
import { create } from 'react-test-renderer';

import UserMenuSettings from 'components/UserMenuSettings';

jest.mock('@material-ui/core/Box', () => 'Box');
jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('@material-ui/core/FormControlLabel', () => 'FormControlLabel');
jest.mock('@material-ui/core/Switch', () => 'Switch');

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
