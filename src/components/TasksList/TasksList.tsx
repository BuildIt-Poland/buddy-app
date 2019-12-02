import React, { useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from 'components/TabPanel';
import AvatarHeader from 'components/AvatarHeader';
import NavBar from 'components/NavBar';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { QueryNewbieArgs, Query, Task, Mutation } from 'buddy-app-schema';
import TASK_LIST from 'graphql/task-list.graphql';
import UPDATE_TASK_STATUS from 'graphql/update-task-status.graphql';
import { useParams } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import TaskTabsContent from 'components/TaskTabsContent';
import SnackBar from 'components/SnackBar';
import LinearProgress from '@material-ui/core/LinearProgress';
import TASKLIST_DICTIONARY from './taskList.dictionary';

const TasksList: React.FC = () => {
  const { newbieId } = useParams<QueryNewbieArgs>();
  const [tabIndex, setTabIndex] = React.useState(0);
  const [snackbar, setSnackbar] = React.useState({
    isOpen: false,
    message: '',
  });

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) =>
    setTabIndex(newValue);

  const { loading, data } = useQuery<Query, QueryNewbieArgs>(TASK_LIST, {
    variables: { newbieId },
  });

  const [
    updateTaskStatus,
    { loading: updateTaskLoading, error: updateTaskError },
  ] = useMutation<Mutation>(UPDATE_TASK_STATUS, {
    onCompleted: () =>
      setSnackbar({
        isOpen: true,
        message: TASKLIST_DICTIONARY.TASK_STATUS_UPDATED,
      }),
  });

  const onTaskChange = (taskId: string) => {
    if (!updateTaskLoading) {
      updateTaskStatus({ variables: { taskId } });
    }
  };

  useEffect(() => {
    if (updateTaskError) {
      setSnackbar({
        isOpen: true,
        message: TASKLIST_DICTIONARY.TASK_UPDATE_SERVER_ERROR,
      });
    }
  }, [updateTaskError]);

  const handleSnackBarClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, isOpen: false });
  };

  const newbieTasks = data && data.newbie.newbieTasks;
  const buddyTasks = data && data.newbie.buddyTasks;

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
          <Tab label='Newbie Tasks' />
          <Tab label='My tasks' />
        </Tabs>
      </AppBar>

      {updateTaskLoading && <LinearProgress />}

      <TabPanel value={tabIndex} index={0}>
        <TaskTabsContent
          loading={loading}
          onChange={onTaskChange}
          tasks={newbieTasks as Task[]}
        />
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <TaskTabsContent
          loading={loading}
          onChange={onTaskChange}
          tasks={buddyTasks as Task[]}
        />
      </TabPanel>
      <SnackBar
        message={snackbar.message}
        isOpen={snackbar.isOpen}
        onClickCloseButton={handleSnackBarClose}
      />
    </Box>
  );
};
export default TasksList;
