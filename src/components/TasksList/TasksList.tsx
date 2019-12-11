import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from 'components/TabPanel';
import AvatarHeader from 'components/AvatarHeader';
import { useQuery, useMutation } from '@apollo/react-hooks';
import SnackbarContext, { SnackbarContextData } from 'contexts/SnackbarContext';
import { QueryNewbieArgs, Query, Task, Mutation } from 'buddy-app-schema';
import { TASK_LIST } from 'graphql/task-list.graphql';
import { UPDATE_TASK_STATUS } from 'graphql/update-task-status.graphql';
import { useParams, useLocation } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import TaskTabsContent from 'components/TaskTabsContent';
import PlusButton from 'components/PlusButton';
import { ROUTES } from 'shared/routes';
import Header, { MenuTypes, MenuColors } from 'components/Header';
import DICTIONARY from './dictionary';

const TasksList: React.FC = () => {
  const { newbieId } = useParams<QueryNewbieArgs>();
  const { state } = useLocation();
  const history = useHistory();
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

  const onBackClick = () => {
    history.push(ROUTES.BUDDY_SELECT_NEWBIE);
  };

  const newbieTasks = data && data.newbie.newbieTasks;
  const buddyTasks = data && data.newbie.buddyTasks;
  const pathname = ROUTES.BUDDY_ADD_TASK.replace(':newbieId', newbieId);

  return (
    <>
      <Header
        type={'back' as MenuTypes}
        color={'paper' as MenuColors}
        loading={loading || updateTaskLoading}
        onButtonClick={onBackClick}>
        <AvatarHeader newbieId={newbieId} />
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
      <Box component={'main'} data-testid='task-list-page'>
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
    </>
  );
};
export default TasksList;
