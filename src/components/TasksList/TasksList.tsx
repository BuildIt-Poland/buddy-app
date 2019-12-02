import React, { useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from 'components/TabPanel';
import AvatarHeader from 'components/AvatarHeader';
import NavBar from 'components/NavBar';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { QueryNewbieArgs, Query, Task, Mutation } from 'buddy-app-schema';
import { TASK_LIST } from 'graphql/task-list.graphql';
import { UPDATE_TASK_STATUS } from 'graphql/update-task-status.graphql';
import { useParams } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import TaskTabsContent from 'components/TaskTabsContent';
import withSnackBar from 'decorators/withSnackBar';
import LinearProgress from '@material-ui/core/LinearProgress';
import DICTIONARY from './taskList.dictionary';
import { TaskListProps } from './types';

const TasksList: React.FC<TaskListProps> = ({ showSnackbar }) => {
  const { newbieId } = useParams<QueryNewbieArgs>();
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) =>
    setTabIndex(newValue);

  const { loading, data } = useQuery<Query, QueryNewbieArgs>(TASK_LIST, {
    variables: { newbieId },
  });

  const [
    updateTaskStatus,
    { loading: updateTaskLoading, error: updateTaskError },
  ] = useMutation<Mutation>(UPDATE_TASK_STATUS, {
    onCompleted: () => showSnackbar(DICTIONARY.SUCCESS_MESSAGE),
  });

  const onTaskChange = (taskId: string) => {
    if (!updateTaskLoading) {
      updateTaskStatus({ variables: { taskId } });
    }
  };

  useEffect(() => {
    if (updateTaskError) {
      showSnackbar(DICTIONARY.ERROR_MESSAGE);
    }
  }, [updateTaskError, showSnackbar]);

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
          <Tab label={DICTIONARY.NEWBIE_TAB_TITLE} />
          <Tab label={DICTIONARY.BUDDY_TAB_TITLE} />
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
    </Box>
  );
};
export default withSnackBar(TasksList);
