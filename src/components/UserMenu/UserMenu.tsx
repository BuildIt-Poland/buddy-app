import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import CloseIcon from '@material-ui/icons/Close';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useQuery } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { BUDDY_MENU_DETAILS, NEWBIE_MENU_DETAILS } from 'graphql/user-menu.graphql';
import UserMenuNewbies from 'components/UserMenuNewbies';
import UserMenuDetails from 'components/UserMenuDetails';
import UserMenuSettings from 'components/UserMenuSettings';
import UserMenuBuddy from 'components/UserMenuBuddy';
import { isBuddy, isNewbie } from 'utils';
import theme from 'styles/theme';
import { ROUTES } from 'shared/routes';
import { Buddy, Newbie, UserRole } from 'buddy-app-schema';
import AuthContext, { AuthContextData } from 'contexts/AuthContext';
import { BasicDetailsParams, UserMenuProps, UserBasicDetails } from './types';

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
  loader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100%',
  },
});

const UserMenu: React.FC<UserMenuProps> = props => {
  const history = useHistory();
  const { list, closeBtn, loader } = useStyles();
  const { isMenuVisible, onClose } = props;
  const { data: AuthData, logout } = useContext<AuthContextData>(AuthContext);
  const { userId, role } = AuthData;

  const getQueryByRole = (role: UserRole, id: string) => {
    if (isBuddy(role)) {
      return { query: BUDDY_MENU_DETAILS, variables: { buddyId: id } };
    } else if (isNewbie(role)) {
      return { query: NEWBIE_MENU_DETAILS, variables: { newbieId: id } };
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
  const { data, loading } = useQuery<UserBasicDetails, BasicDetailsParams>(query, {
    variables,
  });
  const user = data && data[role.toLowerCase()];

  return (
    <Drawer open={isMenuVisible} onClose={onClose} data-testid='slide-menu'>
      <Box className={list}>
        {user && (
          <Box data-testid='slide-menu-body'>
            <Box display='flex' justifyContent='flex-end'>
              <IconButton
                className={closeBtn}
                onClick={onClose}
                data-testid='slide-menu-close-btn'>
                <CloseIcon />
              </IconButton>
            </Box>
            <UserMenuDetails user={user} />
            <Divider />
            {isBuddy(role) && (
              <UserMenuNewbies
                newbies={(user as Buddy).newbies}
                onSelect={selectNewbie}
              />
            )}
            {isNewbie(role) && (
              <UserMenuBuddy buddy={(user as Newbie).buddy} onSelect={selectBuddy} />
            )}
            <Divider />
            <UserMenuSettings
              allowPushedNotifications={!!user.allowPushedNotifications}
              updatePushNotificationsSettings={() => {}}
              onLogoutClick={() => logout()}
            />
          </Box>
        )}
        {loading && (
          <Box className={loader}>
            <CircularProgress data-testid='slide-menu-loader' />
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default UserMenu;
