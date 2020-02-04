import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import NotificationsActiveOutlinedIcon from '@material-ui/icons/NotificationsActiveOutlined';
import { ReminderButtonProps } from './types';

const ReminderButton = (props: ReminderButtonProps) => (
  <IconButton {...props} aria-label='reminder-btn' edge='end'>
    <NotificationsActiveOutlinedIcon />
  </IconButton>
);

ReminderButton.defaultProps = {
  color: 'inherit',
  edge: 'end',
};

export default ReminderButton;
