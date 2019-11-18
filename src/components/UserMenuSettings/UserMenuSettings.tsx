import React from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import theme from 'styles/theme';
import { UserMenuSettingsProps } from './types';

const useStyles = makeStyles({
  wrapper: {
    padding: theme.spacing(2),
  },
});

const UserMenuSettings: React.FC<UserMenuSettingsProps> = props => {
  const PUSH_NOTIFICATIONS_LABEL = 'Allow push notifications';
  const { allowPushedNotifications, updatePushNotificationsSettings } = props;
  const { wrapper } = useStyles();
  return (
    <Box className={wrapper}>
      <Typography component='h3' variant='body1'>
        <Box component='strong' fontWeight={'fontWeightBold'}>
          Settings
        </Box>
      </Typography>
      <FormControlLabel
        control={
          <Switch
            checked={allowPushedNotifications}
            onChange={updatePushNotificationsSettings}
          />
        }
        label={PUSH_NOTIFICATIONS_LABEL}
      />
    </Box>
  );
};

export default UserMenuSettings;
