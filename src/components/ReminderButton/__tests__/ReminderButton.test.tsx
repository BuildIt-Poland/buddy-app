import React from 'react';
import { create } from 'react-test-renderer';

import ReminderButton from '../ReminderButton';

jest.mock('@material-ui/core/Fab', () => 'Fab');
jest.mock(
  '@material-ui/icons/NotificationsActiveOutlined',
  () => 'NotificationsActiveOutlinedIcon'
);

describe('Component - ReminderButton', () => {
  test('renders correctly', () => {
    const component = create(<ReminderButton />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
