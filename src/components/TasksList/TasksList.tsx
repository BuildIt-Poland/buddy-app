import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from 'components/TabPanel';
import AvatarHeader from 'components/AvatarHeader';
import NavBar from 'components/NavBar';
import { useQuery } from '@apollo/react-hooks';
import { QueryNewbieArgs, Query, Task } from 'buddy-app-schema';
import TASK_LIST from 'graphql/taskList.graphql';
import { useParams } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import TaskTabsContent from 'components/TaskTabsContent';

const TasksList: React.FC = () => {
  const [tabIndex, setTabIndex] = React.useState(0);
  const { newbieId } = useParams<QueryNewbieArgs>();

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabIndex(newValue);
  };

  const { loading, data } = useQuery<Query, QueryNewbieArgs>(TASK_LIST, {
    variables: { newbieId },
  });

  return (
    <div data-testid='task-list-page'>
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
      {loading && (
        <Box margin={2} textAlign={'center'} component={'section'}>
          <CircularProgress />
        </Box>
      )}
      {data && (
        <>
          <TabPanel value={tabIndex} index={0}>
            <TaskTabsContent
              tasks={data.newbie.newbieTasks as Task[]}
              completedCount={data.newbie.tasksInfo.newbieCompleted}
              uncompletedCount={data.newbie.tasksInfo.newbieUncompleted}
            />
          </TabPanel>
          <TabPanel value={tabIndex} index={1}>
            <TaskTabsContent
              tasks={data.newbie.buddyTasks as Task[]}
              completedCount={data.newbie.tasksInfo.buddyCompleted}
              uncompletedCount={data.newbie.tasksInfo.buddyUncompleted}
            />
          </TabPanel>
        </>
      )}
    </div>
  );
};
export default TasksList;
