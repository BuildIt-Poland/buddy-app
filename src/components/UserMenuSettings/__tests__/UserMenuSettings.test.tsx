import React from 'react';
import { create } from 'react-test-renderer';

import UserMenuSettings from '../UserMenuSettings';

jest.mock('@material-ui/core/Box', () => 'Box');
jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('@material-ui/core/FormControlLabel', () => 'FormControlLabel');

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