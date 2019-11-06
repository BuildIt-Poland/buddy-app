import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import userService from '../../utils/user-service';
import { ROUTES } from '../../shared/routes';
import { ProtectedRouteProps } from './types';

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        userService.isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: ROUTES.LOGIN,
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
