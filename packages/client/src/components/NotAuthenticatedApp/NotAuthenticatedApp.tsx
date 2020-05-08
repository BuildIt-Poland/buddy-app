import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ROUTES } from 'shared/routes';
import Login from 'pages/Login';
import ForgotPassword from 'pages/ForgotPassword';
import ResetPassword from 'pages/ResetPassword';
import Error404 from 'pages/Error404';

const NotAuthenticatedApp: React.FC = () => (
  <Switch>
    <Route path={ROUTES.LOGIN} exact component={Login} />
    <Route path={ROUTES.FORGOT_PASSWORD} exact component={ForgotPassword} />
    <Route path={ROUTES.RESET_PASSWORD} exact component={ResetPassword} />
    <Route path={ROUTES.ROUTE_404} exact component={Error404} />
    <Redirect path={ROUTES.BASE} exact to={ROUTES.LOGIN} />
    <Redirect path={ROUTES.NEWBIE} to={ROUTES.BASE} />
    <Redirect path={ROUTES.BUDDY} to={ROUTES.BASE} />
    <Redirect path={ROUTES.TALENT} to={ROUTES.BASE} />
    <Redirect to={ROUTES.ROUTE_404} />
  </Switch>
);

export default NotAuthenticatedApp;
