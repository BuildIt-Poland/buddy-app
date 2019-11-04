import React from 'react';
import { Redirect } from 'react-router-dom';
import { ROUTES } from '../../shared/routes';
import userService from '../../utils/user-service';
import { isBuddy, isNewbie } from '../../utils/user-helper';

const RouteRedirect: React.FC<any> = () => {
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
    if (isBuddy(role)) {
      return (
        <Redirect
          to={{
            pathname: ROUTES.BUDDY_SELECT_NEWBIE,
          }}
        />
      );
    } else if (isNewbie(role)) {
      return (
        <Redirect
          to={{
            pathname: ROUTES.NEWBIE_TASKS_LIST,
          }}
        />
      );
    }
  }
  return <></>;
};

export default RouteRedirect;
