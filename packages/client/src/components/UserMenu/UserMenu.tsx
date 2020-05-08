import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useQuery } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import {
  NEWBIE_MENU_DETAILS,
  BUDDY_MENU_DETAILS,
  TALENT_MENU_DETAILS,
} from 'graphql/user-menu.graphql';
import UserMenuUsers from 'atoms/UserMenuUsers';
import UserMenuDetails from 'atoms/UserMenuDetails';
import UserMenuSettings from 'atoms/UserMenuSettings';
import UserMenuBuddy from 'atoms/UserMenuBuddy';
import { ROUTES } from 'shared/routes';
import { UserRole } from '@buddy-app/schema';
import { useAuth } from 'contexts/AuthContext';
import {
  BasicDetailsParams,
  UserMenuProps,
  UserBasicDetails,
  User,
  ToRoute,
} from './types';
import DICTIONARY from './dictionary';

const { Newbie, Buddy, Talent } = UserRole;

const userDetails = {
  [Newbie]: {
    route: ROUTES.NEWBIE_DETAILS,
    query: (newbieId: string) => ({
      query: NEWBIE_MENU_DETAILS,
      variables: { newbieId },
    }),
    component: ({ buddy }: User, toRoute: ToRoute) => (
      <UserMenuBuddy
        buddy={buddy}
        onSelect={(id: string) =>
          toRoute(ROUTES.NEWBIE_BUDDY_DETAILS.replace(':buddyId', id))
        }
      />
    ),
  },
  [Buddy]: {
    route: ROUTES.BUDDY_DETAILS,
    query: (buddyId: string) => ({
      query: BUDDY_MENU_DETAILS,
      variables: { buddyId },
    }),
    component: ({ newbies }: User, toRoute: ToRoute) => (
      <UserMenuUsers
        title={DICTIONARY.TITLES.NEWBIES}
        users={newbies}
        onSelect={(id: string) =>
          toRoute(ROUTES.BUDDY_TASKS_LIST.replace(':newbieId', id))
        }
      />
    ),
  },
  [Talent]: {
    route: ROUTES.TALENT_DETAILS,
    query: (talentId: string) => ({
      query: TALENT_MENU_DETAILS,
      variables: { talentId },
    }),
    component: ({ buddies }: User, toRoute: ToRoute) => (
      <UserMenuUsers
        title={DICTIONARY.TITLES.BUDDIES}
        users={buddies}
        onSelect={(id: string) =>
          toRoute(ROUTES.TALENT_BUDDY_DETAILS.replace(':buddyId', id))
        }
      />
    ),
  },
};

const useStyles = makeStyles(theme => ({
  list: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: theme.spacing(2),
  },
  loader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100%',
  },
}));

const UserMenu: React.FC<UserMenuProps> = ({ onCloseClick }) => {
  const history = useHistory();
  const { list, loader } = useStyles();
  const {
    data: { userId, role },
    logout,
  } = useAuth();

  const toRoute = (route: string) => {
    history.push(route);
    onCloseClick && onCloseClick();
  };

  const onLogoutClick = () => {
    logout();
    history.push(ROUTES.BASE);
  };

  const userClickHandler = () => toRoute(userDetails[role].route);

  const { query, variables } = userDetails[role].query(userId) || {};
  const { data, loading } = useQuery<UserBasicDetails, BasicDetailsParams>(query, {
    variables,
  });
  const user = data && data[role.toLowerCase()];

  return (
    <Box className={list}>
      {user && (
        <Box data-testid='slide-menu-body'>
          <UserMenuDetails user={user} onClick={userClickHandler} />
          <Divider />
          {userDetails[role].component(user, toRoute)}
          <Divider />
          <UserMenuSettings
            allowPushedNotifications={!!user.allowPushedNotifications}
            updatePushNotificationsSettings={() => {}}
            onLogoutClick={onLogoutClick}
          />
        </Box>
      )}
      {loading && (
        <Box className={loader}>
          <CircularProgress data-testid='slide-menu-loader' />
        </Box>
      )}
    </Box>
  );
};

export default UserMenu;
