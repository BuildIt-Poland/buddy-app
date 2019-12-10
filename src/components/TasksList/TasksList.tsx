import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from 'components/TabPanel';
import AvatarHeader from 'components/AvatarHeader';
import NavBar from 'components/NavBar';
import { useQuery, useMutation } from '@apollo/react-hooks';
import SnackbarContext, { SnackbarContextData } from 'contexts/SnackbarContext';
import { QueryNewbieArgs, Query, Task, Mutation } from 'buddy-app-schema';
import { TASK_LIST } from 'graphql/task-list.graphql';
import { UPDATE_TASK_STATUS } from 'graphql/update-task-status.graphql';
import { useParams, useLocation } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import TaskTabsContent from 'components/TaskTabsContent';
import PlusButton from 'components/PlusButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import { ROUTES } from 'shared/routes';
import DICTIONARY from './dictionary';

const TasksList: React.FC = () => {
  const { newbieId } = useParams<QueryNewbieArgs>();
  const { state } = useLocation();
  const defaultTabIndex = (state && state.defaultTabIndex) || 0;
  const [tabIndex, setTabIndex] = React.useState(defaultTabIndex);
  const { showSnackbar } = useContext<SnackbarContextData>(SnackbarContext);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) =>
    setTabIndex(newValue);

  const { loading, data } = useQuery<Query, QueryNewbieArgs>(TASK_LIST, {
    variables: { newbieId },
  });

  const [updateTaskStatus, { loading: updateTaskLoading }] = useMutation<Mutation>(
    UPDATE_TASK_STATUS,
    {
      onCompleted: () => showSnackbar(DICTIONARY.SUCCESS_MESSAGE),
      onError: () => showSnackbar(DICTIONARY.ERROR_MESSAGE),
    }
  );

  const onTaskChange = (taskId: string) => {
    if (!updateTaskLoading) {
      updateTaskStatus({ variables: { taskId } });
    }
  };

  const newbieTasks = data && data.newbie.newbieTasks;
  const buddyTasks = data && data.newbie.buddyTasks;
  const pathname = ROUTES.BUDDY_ADD_TASK.replace(':newbieId', newbieId);

  return (
    <Box component='main' data-testid='task-list-page'>
      <NavBar type={'menu'} />
      <AppBar component='section' position='static' color='inherit'>
        <AvatarHeader />
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          indicatorColor='primary'
          textColor='primary'
          variant='fullWidth'>
          <Tab label={DICTIONARY.NEWBIE_TAB_TITLE} />
          <Tab label={DICTIONARY.BUDDY_TAB_TITLE} />
        </Tabs>
      </AppBar>

      {updateTaskLoading && <LinearProgress />}

      <TabPanel value={tabIndex} index={0}>
        <TaskTabsContent
          loading={loading}
          tabIndex={tabIndex}
          onChange={onTaskChange}
          tasks={newbieTasks as Task[]}
        />
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <TaskTabsContent
          tabIndex={tabIndex}
          loading={loading}
          onChange={onTaskChange}
          tasks={buddyTasks as Task[]}
        />
      </TabPanel>
      <PlusButton
        title={DICTIONARY.PLUS_BUTTON_TITLE}
        component={Link}
        to={{ pathname, state: { tabIndex } }}
      />
    </Box>
  );
};
export default TasksList;
