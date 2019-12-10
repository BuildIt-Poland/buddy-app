import React, { useContext } from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { ROUTES } from 'shared/routes';
import { isNewbie } from 'utils';
import AuthContext, { AuthContextData } from 'contexts/AuthContext';
import { auth } from 'utils';
import TaskDetails from '../TaskDetails';
import Login from '../Login';
import TasksList from '../TasksList';
import NewbieTasksList from '../NewbieTasksList';
import AddNewbie from '../AddNewbie';
import NewbieSelect from '../NewbieSelect';
import ContactDetails from '../ContactDetails';
import AddTask from '../AddTask';
import ErrorPage from '../ErrorPage';

const newbieRoutes = [
  {
    path: ROUTES.NEWBIE_BUDDY_DETAILS,
    component: ContactDetails,
  },
  {
    path: ROUTES.NEWBIE_TASKS_LIST,
    component: NewbieTasksList,
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
  const {
    isAuthenticated,
    data: { role },
  } = useContext<AuthContextData>(AuthContext);

  const hasError = false;
  const isNewbieRole = isNewbie(role);
  const hasToken = !!auth.getToken();
  const routes = isNewbieRole ? newbieRoutes : buddyRoutes;
  const redirectPath = !isAuthenticated
    ? ROUTES.LOGIN
    : hasError
    ? ROUTES.ERROR
    : isNewbieRole
    ? ROUTES.NEWBIE_TASKS_LIST
    : ROUTES.BUDDY_SELECT_NEWBIE;

  return (
    <BrowserRouter basename={ROUTES.BASE} data-testid={'root'}>
      <Switch>
        {isAuthenticated ? (
          routes.map(({ path, component }, key) => (
            <Route key={key} path={path} exact component={component} />
          ))
        ) : (
          <Route path={ROUTES.LOGIN} exact component={Login} />
        )}
        {hasError && <Route path={ROUTES.ERROR} exact component={ErrorPage} />}
        {(!hasToken || isAuthenticated) && (
          <Redirect to={{ pathname: redirectPath }} />
        )}
      </Switch>
    </BrowserRouter>
  );
};
export default Root;
