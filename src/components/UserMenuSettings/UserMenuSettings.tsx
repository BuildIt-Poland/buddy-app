import React from 'react';
import { Box, Typography } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { UserMenuSettingsProps } from './types';

const UserMenuSettings: React.FC<UserMenuSettingsProps> = props => {
  const PUSH_NOTIFICATIONS_LABEL = 'Allow push notifications';
  const { allowPushedNotifications, updatePushNotificationsSettings } = props;

  return (
    <>
      <Typography component='p' variant='h4'>
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
    </>
  );
};

export default UserMenuSettings;
