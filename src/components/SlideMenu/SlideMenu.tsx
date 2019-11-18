import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import CloseIcon from '@material-ui/icons/Close';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import { useQuery } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import {
  BUDDY_USER_MENU_DETAILS,
  NEWBIE_USER_MENU_DETAILS,
} from 'graphql/user-menu.graphql';
import NewbiesMenuSection from 'components/NewbiesMenuSection';
import UserMenuDetails from 'components/UserMenuDetails';
import UserMenuSettings from 'components/UserMenuSettings';
import BuddyMenuSection from 'components/BuddyMenuSection';
import { isBuddy, isNewbie } from 'utils';
import theme from 'styles/theme';
import { ROUTES } from 'shared/routes';
import { Buddy, Newbie, UserRole } from 'buddy-app-schema';
import AuthContext, { AuthContextData } from 'contexts/AuthContext';
import { BasicDetailsParams, SlideMenuProps, UserBasicDetails } from './types';

const useStyles = makeStyles({
  list: {
    width: '35rem',
    display: 'flex',
    flexDirection: 'column',
  },
  closeBtn: {
    alignSelf: 'flex-end',
    zIndex: theme.zIndex.base,
  },
});

const SlideMenu: React.FC<SlideMenuProps> = props => {
  const history = useHistory();
  const { list, closeBtn } = useStyles();
  const { isMenuVisible, onClose } = props;
  const { data: AuthData } = useContext<AuthContextData>(AuthContext);
  const { userId, role } = AuthData;

  const getQueryByRole = (role: UserRole, id: string) => {
    if (isBuddy(role)) {
      return { query: BUDDY_USER_MENU_DETAILS, variables: { buddyId: id } };
    } else if (isNewbie(role)) {
      return { query: NEWBIE_USER_MENU_DETAILS, variables: { newbieId: id } };
    }
  };

  const selectNewbie = (id: string) => {
    history.push(ROUTES.BUDDY_TASKS_LIST.replace(':newbieId', id));
    onClose();
  };

  const selectBuddy = (id: string) => {
    history.push(ROUTES.NEWBIE_BUDDY_DETAILS.replace(':buddyId', id));
    onClose();
  };

  const { query, variables } = getQueryByRole(role, userId) || {};
  const { data } = useQuery<UserBasicDetails, BasicDetailsParams>(query, {
    variables,
  });
  const user = data && data[role.toLowerCase()];
  return (
    <Drawer open={isMenuVisible} onClose={onClose}>
      {user && (
        <Box className={list} role='presentation'>
          <IconButton className={closeBtn} onClick={onClose}>
            <CloseIcon />
          </IconButton>
          <UserMenuDetails user={user} />
          <Divider />
          {isBuddy(role) && (
            <NewbiesMenuSection
              newbies={(user as Buddy).newbies}
              onSelect={selectNewbie}
            />
          )}
          {isNewbie(role) && (
            <BuddyMenuSection
              buddy={(user as Newbie).buddy}
              onSelect={selectBuddy}
            />
          )}
          <Divider />
          <UserMenuSettings
            allowPushedNotifications={!!user.allowPushedNotifications}
            updatePushNotificationsSettings={() => {}}
          />
        </Box>
      )}
    </Drawer>
  );
};

export default SlideMenu;
