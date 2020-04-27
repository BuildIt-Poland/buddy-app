import React, { useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from 'atoms/TabPanel';
import AvatarHeader from 'components/AvatarHeader';
import { useQuery } from '@apollo/react-hooks';
import { useSnackBar } from 'contexts/SnackbarContext';
import { useAuth } from 'contexts/AuthContext';
import {
  QueryNewbieArgs,
  Query,
  Task,
  NewbieTask,
  BuddyTask,
} from '@buddy-app/schema';
import { TASK_LIST } from 'graphql/task-list.graphql';
import { useParams, useLocation } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import TaskTabsContent from 'components/TaskTabsContent';
import { ROUTES } from 'shared/routes';
import useTaskProgress from 'hooks/useTaskProgress';
import useTaskStatusUpdate from 'hooks/useTaskStatusUpdate';
import Header, { MenuTypes, MenuColors } from 'components/Header';
import AddTaskOptions from 'components/AddTaskOptions';
import { isTemplateTask, isTalent } from 'utils';
import { TasksListProps } from './types';
import DICTIONARY from './dictionary';

const TasksList: React.FC<TasksListProps> = ({ history }) => {
  const { newbieId } = useParams<QueryNewbieArgs>();
  const {
    data: { role },
  } = useAuth();
  const { state } = useLocation();
  const { showSnackbar } = useSnackBar();
  const defaultTabIndex = (state && state.defaultTabIndex) || 0;
  const [tabIndex, setTabIndex] = useState(defaultTabIndex);

  const { loading, data } = useQuery<Query, QueryNewbieArgs>(TASK_LIST, {
    variables: { newbieId },
  });
  const { buddyProgress } = useTaskProgress(data && data.newbie);

  const [mutation] = useTaskStatusUpdate(newbieId, {
    onCompleted: () => showSnackbar(DICTIONARY.SUCCESS_MESSAGE),
    onError: () => showSnackbar(DICTIONARY.ERROR_MESSAGE),
  });

  const updateTaskStatus = (task: NewbieTask | BuddyTask) => {
    if (data && isTemplateTask(data.newbie.name)) {
      showSnackbar(DICTIONARY.TEMPLATE_MESSAGE);
    } else {
      mutation(task);
    }
  };

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) =>
    setTabIndex(newValue);

  const goBack = () => {
    if (history.length > 2) {
      history.goBack();
    } else {
      history.push(ROUTES.BASE);
    }
  };

  const newbieTasks = data && data.newbie.newbieTasks;
  const buddyTasks = data && data.newbie.buddyTasks;
  const route = isTalent(role) ? ROUTES.TALENT_ADD_TASK : ROUTES.BUDDY_ADD_TASK;
  const pathname = route.replace(':newbieId', newbieId);

  return (
    <>
      <Header type={MenuTypes.BACK} color={MenuColors.PAPER} onButtonClick={goBack}>
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
      <Box
        component={'main'}
        flex={1}
        padding='2rem 2rem 5rem 3rem'
        data-testid='task-list-page'>
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
          newbieId={newbieId}
          title={DICTIONARY.PLUS_BUTTON_TITLE}
          to={{ pathname, state: { tabIndex } }}
        />
      </Box>
    </>
  );
};
export default TasksList;
