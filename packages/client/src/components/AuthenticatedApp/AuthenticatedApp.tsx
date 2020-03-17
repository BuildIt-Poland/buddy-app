import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ROUTES } from 'shared/routes';
import AppWrapper from 'components/AppWrapper';
import TaskDetails from 'pages/TaskDetails';
import TasksList from 'pages/TasksList';
import NewbieTasksList from 'pages/NewbieTasksList';
import AddNewbie from 'pages/AddNewbie';
import NewbieSelect from 'pages/NewbieSelect';
import ContactDetails from 'pages/ContactDetails';
import AddTask from 'pages/AddTask';
import Error404 from 'pages/Error404';
import { useAuth } from 'contexts/AuthContext';
import { isNewbie } from 'utils';
import { MenuProvider } from 'contexts/MenuContext';
import { SnackbarProvider } from 'contexts/SnackbarContext';

const newbieRoutes = [
  {
    path: ROUTES.NEWBIE_DETAILS,
    component: ContactDetails,
  },
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
    path: ROUTES.BUDDY_DETAILS,
    component: ContactDetails,
  },
  {
    path: ROUTES.BUDDY_NEWBIE_DETAILS,
    component: ContactDetails,
  },
];

const AuthenticatedApp: React.FC = () => {
  const [
    {
      data: { role },
    },
  ] = useAuth();

  const isNewbieRole = isNewbie(role);
  const routes = isNewbieRole ? newbieRoutes : buddyRoutes;
  const redirectPath = isNewbieRole
    ? ROUTES.NEWBIE_TASKS_LIST
    : ROUTES.BUDDY_SELECT_NEWBIE;

  return (
    <SnackbarProvider>
      <MenuProvider>
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
      </MenuProvider>
    </SnackbarProvider>
  );
};

export default AuthenticatedApp;
