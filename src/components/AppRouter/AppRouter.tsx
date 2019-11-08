import React, { useContext } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { ROUTES } from 'shared/routes';
import { isNewbie } from 'utils';
import { AuthContext, AuthContextData } from 'context/AuthStore';
import { auth } from 'utils';
import TaskDetails from '../TaskDetails';
import Login from '../Login';
import TasksList from '../TasksList';
import AddNewbie from '../AddNewbie';
import NewbieSelect from '../NewbieSelect';
import ContactDetails from '../ContactDetails';
import AddTask from '../AddTask';
import ErrorPage from '../ErrorPage';

const useStyles = makeStyles(theme => ({
  container: {
    minWidth: theme.breakpoints.values['xs'],
    marginTop: theme.spacing(9),
  },
}));

const newbieRoutes = [
  {
    path: ROUTES.NEWBIE_BUDDY_DETAILS,
    component: ContactDetails,
  },
  {
    path: ROUTES.NEWBIE_TASKS_LIST,
    component: TasksList,
  },
  {
    path: ROUTES.NEWBIE_TASK_DETAILS,
    component: TaskDetails,
  },
];

const buddyRoutes = [
  {
    path: ROUTES.BUDDY_ADD_TASK,
    component: AddTask,
  },
  {
    path: ROUTES.BUDDY_ADD_NEWBIE,
    component: AddNewbie,
  },
  {
    path: ROUTES.BUDDY_SELECT_NEWBIE,
    component: NewbieSelect,
  },
  {
    path: ROUTES.BUDDY_TASKS_LIST,
    component: TasksList,
  },
  {
    path: ROUTES.BUDDY_TASK_DETAILS,
    component: TaskDetails,
  },
  {
    path: ROUTES.BUDDY_NEWBIE_DETAILS,
    component: ContactDetails,
  },
];

const Root: React.FC = () => {
  const classes = useStyles();
  const {
    isAuthenticated,
    data: { role },
  } = useContext<AuthContextData>(AuthContext);
  const isNewbieRole = isNewbie(role);
  const hasAuthRecord = !!auth.getUser();
  const routes = isNewbieRole ? newbieRoutes : buddyRoutes;
  const redirectPath = !isAuthenticated
    ? ROUTES.LOGIN
    : isNewbieRole
    ? ROUTES.NEWBIE_TASKS_LIST
    : ROUTES.BUDDY_SELECT_NEWBIE;

  return (
    <Container
      data-testid={'root'}
      className={classes.container}
      component='main'
      maxWidth='md'>
      <BrowserRouter basename={ROUTES.BASE}>
        <Switch>
          {isAuthenticated ? (
            routes.map(({ path, component }, key) => (
              <Route key={key} path={path} exact component={component} />
            ))
          ) : (
            <Route path={ROUTES.LOGIN} exact component={Login} />
          )}
          <Route path={ROUTES.ERROR} exact component={ErrorPage} />
          {(!hasAuthRecord || isAuthenticated) && (
            <Redirect to={{ pathname: redirectPath }} />
          )}
        </Switch>
      </BrowserRouter>
    </Container>
  );
};
export default Root;
