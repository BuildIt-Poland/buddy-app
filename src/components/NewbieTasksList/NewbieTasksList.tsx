import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useSnackBar } from 'contexts/SnackbarContext';
import { useAuth } from 'contexts/AuthContext';
import { useMenu } from 'contexts/MenuContext';
import { QueryNewbieArgs, Query, Task } from 'buddy-app-schema';
import { TASK_LIST } from 'graphql/task-list.graphql';
import useTaskProgress from 'hooks/useTaskProgress';
import useTaskStatusUpdate from 'hooks/useTaskStatusUpdate';
import Box from '@material-ui/core/Box';
import Header, { MenuTypes, MenuColors, MenuShapes } from 'components/Header';
import AvatarHeader from 'components/AvatarHeader';
import TaskTabsContent from 'components/TaskTabsContent';
import DICTIONARY from './dictionary';

const NewbieTasksList: React.FC = () => {
  const [
    {
      data: { userId },
    },
  ] = useAuth();
  const { toggleMenu } = useMenu();
  const newbieId = userId;
  const { showSnackbar } = useSnackBar();
  const { loading, data } = useQuery<Query, QueryNewbieArgs>(TASK_LIST, {
    variables: { newbieId },
  });

  const { newbieProgress } = useTaskProgress(data && data.newbie);

  const [updateTaskStatus] = useTaskStatusUpdate(newbieId, {
    onCompleted: () => showSnackbar(DICTIONARY.SUCCESS_MESSAGE),
    onError: () => showSnackbar(DICTIONARY.ERROR_MESSAGE),
  });

  const newbieTasks = data && data.newbie.newbieTasks;

  return (
    <>
      <Header
        type={MenuTypes.MENU}
        color={MenuColors.PAPER}
        shape={MenuShapes.ROUNDED}
        onButtonClick={toggleMenu}>
        <AvatarHeader newbieId={newbieId} taskProgress={newbieProgress} />
      </Header>
      <Box component='main' flex={1} data-testid='task-list-page'>
        <TaskTabsContent
          loading={loading}
          onChange={updateTaskStatus}
          tasks={newbieTasks as Task[]}
        />
      </Box>
    </>
  );
};
export default NewbieTasksList;
