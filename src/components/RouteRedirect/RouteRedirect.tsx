import React from 'react';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../../shared/routes';
import userService from '../../utils/user.service';
import { isBuddy, isNewbie } from '../../utils/user-helper';

const RouteRedirect: React.FC = () => {
  const history = useHistory();
  if (!userService.isAuthenticated) {
    history.push(ROUTES.LOGIN);
  } else {
    const { role } = userService.getUser();
    if (isBuddy(role)) {
      history.push(ROUTES.BUDDY_SELECT_NEWBIE);
    } else if (isNewbie(role)) {
      history.push(ROUTES.NEWBIE_TASKS_LIST);
    }
  }
  return <></>;
};

export default RouteRedirect;
