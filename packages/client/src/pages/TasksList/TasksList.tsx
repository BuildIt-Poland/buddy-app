import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from 'atoms/TabPanel';
import AvatarHeader from 'components/AvatarHeader';
import { useQuery } from '@apollo/react-hooks';
import { useSnackBar } from 'contexts/SnackbarContext';
import { QueryNewbieArgs, Query, Task } from '@buddy-app/schema';
import { TASK_LIST } from 'graphql/task-list.graphql';
import { useParams, useLocation } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import TaskTabsContent from 'components/TaskTabsContent';
import { ROUTES } from 'shared/routes';
import useTaskProgress from 'hooks/useTaskProgress';
import useTaskStatusUpdate from 'hooks/useTaskStatusUpdate';
import Header, { MenuTypes, MenuColors } from 'components/Header';
import AddTaskOptions from 'components/AddTaskOptions';
import DICTIONARY from './dictionary';

const TasksList: React.FC = () => {
  const { newbieId } = useParams<QueryNewbieArgs>();
  const { state } = useLocation();
  const history = useHistory();
  const { showSnackbar } = useSnackBar();
  const defaultTabIndex = (state && state.defaultTabIndex) || 0;
  const [tabIndex, setTabIndex] = useState(defaultTabIndex);

  const { loading, data } = useQuery<Query, QueryNewbieArgs>(TASK_LIST, {
    variables: { newbieId },
  });
  const { buddyProgress } = useTaskProgress(data && data.newbie);
  const [updateTaskStatus] = useTaskStatusUpdate(newbieId, {
    onCompleted: () => showSnackbar(DICTIONARY.SUCCESS_MESSAGE),
    onError: () => showSnackbar(DICTIONARY.ERROR_MESSAGE),
  });

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) =>
    setTabIndex(newValue);

  const onBackClick = () => {
    history.push(ROUTES.BUDDY_SELECT_NEWBIE);
  };

  const newbieTasks = data && data.newbie.newbieTasks;
  const buddyTasks = data && data.newbie.buddyTasks;
  const pathname = ROUTES.BUDDY_ADD_TASK.replace(':newbieId', newbieId);

  return (
    <>
      <Header
        type={MenuTypes.BACK}
        color={MenuColors.PAPER}
        onButtonClick={onBackClick}>
        <AvatarHeader newbieId={newbieId} taskProgress={buddyProgress} />
        <Tabs
          centered
          value={tabIndex}
          onChange={handleTabChange}
          indicatorColor='primary'
          textColor='primary'
          variant='fullWidth'>
          <Tab label={DICTIONARY.NEWBIE_TAB_TITLE} />
          <Tab label={DICTIONARY.BUDDY_TAB_TITLE} />
        </Tabs>
      </Header>
      <Box component={'main'} flex={1} data-testid='task-list-page'>
        <TabPanel value={tabIndex} index={0}>
          <TaskTabsContent
            loading={loading}
            tabIndex={tabIndex}
            onChange={updateTaskStatus}
            tasks={newbieTasks as Task[]}
          />
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <TaskTabsContent
            tabIndex={tabIndex}
            loading={loading}
            onChange={updateTaskStatus}
            tasks={buddyTasks as Task[]}
          />
        </TabPanel>
        <AddTaskOptions
          title={DICTIONARY.PLUS_BUTTON_TITLE}
          to={{ pathname, state: { tabIndex } }}
        />
      </Box>
    </>
  );
};
export default TasksList;
