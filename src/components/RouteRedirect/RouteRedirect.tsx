import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { ROUTES } from '../../shared/routes';
import userService from '../../utils/user-service';
import { isBuddy, isNewbie } from '../../utils/user-helper';

const isBaseRoute = (path: string) => path === ROUTES.BASE;
const isUserAllowed = (urlFragment: string, path: string) =>
  isBaseRoute(path) || path.startsWith(urlFragment);

const RouteRedirect: React.FC = (props: any) => {
  const NEWBIE_PREFIX = '/newbie';
  const BUDDY_PREFIX = '/buddy';
  const { location } = props;
  if (!userService.isAuthenticated()) {
    return (
      <Redirect
        to={{
          pathname: ROUTES.LOGIN,
        }}
      />
    );
  } else {
    const { role } = userService.getUser();
    if (isBuddy(role) && isUserAllowed(NEWBIE_PREFIX, location.pathname)) {
      return (
        <Redirect
          to={{
            pathname: ROUTES.BUDDY_SELECT_NEWBIE,
          }}
        />
      );
    } else if (isNewbie(role) && isUserAllowed(BUDDY_PREFIX, location.pathname)) {
      return (
        <Redirect
          to={{
            pathname: ROUTES.NEWBIE_TASKS_LIST,
          }}
        />
      );
    } else if (!isBaseRoute(location.pathname)) {
      return (
        <Redirect
          to={{
            pathname: location.pathname,
          }}
        />
      );
    }
  }
  return <></>;
};

export default withRouter(RouteRedirect);
