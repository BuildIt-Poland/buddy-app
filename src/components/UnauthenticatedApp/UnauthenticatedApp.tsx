import React from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { ROUTES } from 'shared/routes';
import Login from 'components/Login';
import Error404 from 'components/Error404';

const NotAuthenticatedApp: React.FC = () => (
  <BrowserRouter basename={ROUTES.BASE} data-testid={'root'}>
    <Switch>
      <Route path={ROUTES.LOGIN} exact component={Login} />
      <Route path={ROUTES.ROUTE_404} exact component={Error404} />
      <Redirect path={ROUTES.BASE} exact to={ROUTES.LOGIN} />
      <Redirect to={ROUTES.ROUTE_404} />
    </Switch>
  </BrowserRouter>
);

export default NotAuthenticatedApp;
