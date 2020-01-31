import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import NotificationsActiveOutlinedIcon from '@material-ui/icons/NotificationsActiveOutlined';
import { ReminderButtonProps } from './types';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1.5, 0),
  },
}));

const ReminderButton = (props: ReminderButtonProps) => {
  const { button } = useStyles();
  return (
    <Fab {...props} aria-label='reminder-btn' className={button}>
      <NotificationsActiveOutlinedIcon />
    </Fab>
  );
};

ReminderButton.defaultProps = {
  color: 'inherit',
  size: 'small',
};

export default ReminderButton;
