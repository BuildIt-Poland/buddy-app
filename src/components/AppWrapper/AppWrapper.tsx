import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { Route, BrowserRouter } from 'react-router-dom';
import { ROUTES } from '../../shared/routes';
import TaskDetails from '../TaskDetails';
import Login from '../Login';
import TasksList from '../TasksList';
import AddNewbie from '../AddNewbie';
import NewbieSelect from '../NewbieSelect';
import ContactDetails from '../ContactDetails';
import AddTask from '../AddTask';
import ErrorPage from '../ErrorPage';
import ProtectedRoute from '../ProtectedRoute';
import Logout from '../Logout/Logout';
import RouteRedirect from '../RouteRedirect';

const useStyles = makeStyles(theme => ({
  container: {
    minWidth: theme.breakpoints.values['xs'],
    marginTop: theme.spacing(9),
  },
}));

const Root: React.FC = () => {
  const classes = useStyles();
  return (
    <Container
      data-testid={'root'}
      className={classes.container}
      component='main'
      maxWidth='md'>
      <BrowserRouter basename={ROUTES.BASE}>
        <Route path={ROUTES.BASE} exact component={RouteRedirect} />
        <Route path={ROUTES.ERROR} exact component={ErrorPage} />
        <Route path={ROUTES.LOGIN} exact component={Login} />
        <Route path={ROUTES.LOGOUT} exact component={Logout} />
        <ProtectedRoute path={ROUTES.BUDDY_ADD_NEWBIE} exact component={AddNewbie} />
        <ProtectedRoute
          path={ROUTES.BUDDY_SELECT_NEWBIE}
          exact
          component={NewbieSelect}
        />
        <ProtectedRoute path={ROUTES.BUDDY_TASKS_LIST} exact component={TasksList} />
        <ProtectedRoute
          path={ROUTES.BUDDY_TASK_DETAILS}
          exact
          component={TaskDetails}
        />
        <ProtectedRoute
          path={ROUTES.BUDDY_NEWBIE_DETAILS}
          exact
          component={ContactDetails}
        />
        <ProtectedRoute
          path={ROUTES.NEWBIE_BUDDY_DETAILS}
          exact
          component={ContactDetails}
        />
        <ProtectedRoute path={ROUTES.BUDDY_ADD_TASK} exact component={AddTask} />
        <ProtectedRoute
          path={ROUTES.NEWBIE_TASKS_LIST}
          exact
          component={TasksList}
        />
        <ProtectedRoute
          path={ROUTES.NEWBIE_TASK_DETAILS}
          exact
          component={TaskDetails}
        />
        <Route component={RouteRedirect} />
      </BrowserRouter>
    </Container>
  );
};
export default Root;
