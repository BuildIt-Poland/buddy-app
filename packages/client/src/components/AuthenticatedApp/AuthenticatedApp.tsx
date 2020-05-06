import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ROUTES } from 'shared/routes';
import { UserRole } from '@buddy-app/schema';
import AppWrapper from 'components/AppWrapper';
import TaskDetailsRedirect from 'components/TaskDetailsRedirect';
import TaskDetails from 'pages/TaskDetails';
import TasksList from 'pages/TasksList';
import NewbieTasksList from 'pages/NewbieTasksList';
import AddUser from 'pages/AddUser';
import EditUser from 'pages/EditUser';
import NewbieSelect from 'pages/NewbieSelect';
import BuddySelect from 'pages/BuddySelect';
import ContactDetails from 'pages/ContactDetails';
import AddTask from 'pages/AddTask';
import EditTask from 'pages/EditTask';
import Error404 from 'pages/Error404';
import { useAuth } from 'contexts/AuthContext';
import { MenuProvider } from 'contexts/MenuContext';
import { SnackbarProvider } from 'contexts/SnackbarContext';
import { LoadingProvider } from 'contexts/LoadingContext';
import { Users } from './types';

const newbieRoutes = [
  {
    path: ROUTES.NEWBIE_DETAILS,
    component: ContactDetails,
  },
  {
    path: ROUTES.NEWBIE_EDIT_DETAILS,
    component: EditUser,
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
  {
    path: ROUTES.BUDDY_TASK_DETAILS,
    component: TaskDetailsRedirect,
  },
  {
    path: ROUTES.TALENT_TASK_DETAILS,
    component: TaskDetailsRedirect,
  },
];

const buddyRoutes = [
  {
    path: ROUTES.BUDDY_ADD_TASK,
    component: AddTask,
  },
  {
    path: ROUTES.BUDDY_EDIT_TASK,
    component: EditTask,
  },
  {
    path: ROUTES.BUDDY_ADD_NEWBIE,
    component: AddUser,
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
    path: ROUTES.NEWBIE_TASK_DETAILS,
    component: TaskDetailsRedirect,
  },
  {
    path: ROUTES.TALENT_TASK_DETAILS,
    component: TaskDetailsRedirect,
  },
  {
    path: ROUTES.BUDDY_DETAILS,
    component: ContactDetails,
  },
  {
    path: ROUTES.NEWBIE_EDIT_DETAILS,
    component: EditUser,
  },
  {
    path: ROUTES.BUDDY_NEWBIE_DETAILS,
    component: ContactDetails,
  },
  {
    path: ROUTES.BUDDY_EDIT_NEWBIE_DETAILS,
    component: EditUser,
  },
];

const talentRoutes = [
  {
    path: ROUTES.TALENT_ADD_TASK,
    component: AddTask,
  },
  {
    path: ROUTES.TALENT_EDIT_TASK,
    component: EditTask,
  },
  {
    path: ROUTES.TALENT_ADD_NEWBIE,
    component: AddUser,
  },
  {
    path: ROUTES.TALENT_ADD_BUDDY,
    component: AddUser,
  },
  {
    path: ROUTES.TALENT_ADD_TALENT,
    component: AddUser,
  },
  {
    path: ROUTES.TALENT_SELECT_NEWBIE,
    component: NewbieSelect,
  },
  {
    path: ROUTES.TALENT_SELECT_BUDDY,
    component: BuddySelect,
  },
  {
    path: ROUTES.TALENT_TASKS_LIST,
    component: TasksList,
  },
  {
    path: ROUTES.TALENT_TASK_DETAILS,
    component: TaskDetails,
  },
  {
    path: ROUTES.BUDDY_TASK_DETAILS,
    component: TaskDetailsRedirect,
  },
  {
    path: ROUTES.NEWBIE_TASK_DETAILS,
    component: TaskDetailsRedirect,
  },
  {
    path: ROUTES.TALENT_DETAILS,
    component: ContactDetails,
  },
  {
    path: ROUTES.TALENT_EDIT_DETAILS,
    component: EditUser,
  },
  {
    path: ROUTES.TALENT_NEWBIE_DETAILS,
    component: ContactDetails,
  },
  {
    path: ROUTES.TALENT_EDIT_NEWBIE_DETAILS,
    component: EditUser,
  },
  {
    path: ROUTES.TALENT_BUDDY_DETAILS,
    component: ContactDetails,
  },
  {
    path: ROUTES.TALENT_EDIT_BUDDY_DETAILS,
    component: EditUser,
  },
];

const AuthenticatedApp: React.FC = () => {
  const {
    data: { userId, role },
  } = useAuth();

  const users: Users = {
    [UserRole.Newbie]: {
      routes: newbieRoutes,
      redirectPath: ROUTES.NEWBIE_TASKS_LIST.replace(':newbieId', userId),
    },
    [UserRole.Buddy]: {
      routes: buddyRoutes,
      redirectPath: ROUTES.BUDDY_SELECT_NEWBIE,
    },
    [UserRole.Talent]: {
      routes: talentRoutes,
      redirectPath: ROUTES.TALENT_SELECT_BUDDY,
    },
  };

  const routes = users[role].routes;
  const redirectPath: string = users[role].redirectPath;

  return (
    <LoadingProvider>
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
    </LoadingProvider>
  );
};

export default AuthenticatedApp;
