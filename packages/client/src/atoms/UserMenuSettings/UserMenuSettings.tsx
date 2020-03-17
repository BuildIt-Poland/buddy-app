import React from 'react';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Switch from '@material-ui/core/Switch';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { UserMenuSettingsProps } from './types';
import USER_MENU_SETTINGS_DICTIONARY from './dictionary';

const UserMenuSettings: React.FC<UserMenuSettingsProps> = props => {
  const {
    allowPushedNotifications,
    updatePushNotificationsSettings,
    onLogoutClick,
  } = props;

  return (
    <List
      subheader={
        <ListSubheader>
          <strong>{USER_MENU_SETTINGS_DICTIONARY.SETTINGS}</strong>
        </ListSubheader>
      }>
      <ListItem>
        <ListItemIcon>
          <NotificationsIcon />
        </ListItemIcon>
        <ListItemText
          primary={USER_MENU_SETTINGS_DICTIONARY.PUSH_NOTIFICATIONS_LABEL}
        />
        <ListItemSecondaryAction>
          <Switch
            checked={allowPushedNotifications}
            onChange={updatePushNotificationsSettings}
            disabled
          />
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem data-testid='user-menu-logout-btn' button onClick={onLogoutClick}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary={USER_MENU_SETTINGS_DICTIONARY.LOGOUT} />
      </ListItem>
    </List>
  );
};

export default UserMenuSettings;
