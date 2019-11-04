import React from 'react';
import { Redirect } from 'react-router';
import userService from '../../utils/user.service';
import { ROUTES } from '../../shared/routes';

const Logout: React.FC = () => {
  userService.logout();

  return (
    <>
      <Redirect
        to={{
          pathname: ROUTES.BASE,
        }}
      />
    </>
  );
};

export default Logout;
