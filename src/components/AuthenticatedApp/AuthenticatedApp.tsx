import React, { useContext } from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { ROUTES } from 'shared/routes';
import AppWrapper from 'components/AppWrapper';
import TaskDetails from 'components/TaskDetails';
import TasksList from 'components/TasksList';
import NewbieTasksList from 'components/NewbieTasksList';
import AddNewbie from 'components/AddNewbie';
import NewbieSelect from 'components/NewbieSelect';
import ContactDetails from 'components/ContactDetails';
import AddTask from 'components/AddTask';
import Error404 from 'components/Error404';
import AuthContext, { AuthContextData } from 'contexts/AuthContext';
import { isNewbie } from 'utils';

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

const AuthenticatedApp: React.FC = () => {
  const {
    data: { role },
  } = useContext<AuthContextData>(AuthContext);

  const isNewbieRole = isNewbie(role);
  const routes = isNewbieRole ? newbieRoutes : buddyRoutes;
  const redirectPath = isNewbieRole
    ? ROUTES.NEWBIE_TASKS_LIST
    : ROUTES.BUDDY_SELECT_NEWBIE;

  return (
    <BrowserRouter basename={ROUTES.BASE} data-testid={'root'}>
      <AppWrapper>
        <Switch>
          {routes.map(({ path, component }, key) => (
            <Route key={key} path={path} exact component={component} />
          ))}
          <Route path={ROUTES.ROUTE_404} exact component={Error404} />
          <Redirect path={ROUTES.BASE} exact to={redirectPath} />
          <Redirect path={ROUTES.LOGIN} exact to={redirectPath} />
          <Redirect to={ROUTES.ROUTE_404} />
        </Switch>
      </AppWrapper>
    </BrowserRouter>
  );
};

export default AuthenticatedApp;
