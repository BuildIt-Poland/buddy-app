import React, { useContext } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import SnackbarContext, { SnackbarContextData } from 'contexts/SnackbarContext';
import AuthContext, { AuthContextData } from 'contexts/AuthContext';
import MenuContext, { MenuContextData } from 'contexts/MenuContext';
import { QueryNewbieArgs, Query, Task, Mutation } from 'buddy-app-schema';
import { TASK_LIST } from 'graphql/task-list.graphql';
import { UPDATE_TASK_STATUS } from 'graphql/update-task-status.graphql';
import Box from '@material-ui/core/Box';
import Header, { MenuTypes, MenuColors, MenuShapes } from 'components/Header';
import AvatarHeader from 'components/AvatarHeader';
import TaskTabsContent from 'components/TaskTabsContent';
import DICTIONARY from './dictionary';

const NewbieTasksList: React.FC = () => {
  const { data: AuthData } = useContext<AuthContextData>(AuthContext);
  const { toggleMenu } = React.useContext<MenuContextData>(MenuContext);
  const { showSnackbar } = useContext<SnackbarContextData>(SnackbarContext);
  const newbieId = AuthData.userId;

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

  return (
    <>
      <Header
        type={MenuTypes.MENU}
        color={MenuColors.PAPER}
        shape={MenuShapes.ROUNDED}
        loading={loading || updateTaskLoading}
        onButtonClick={toggleMenu}>
        <AvatarHeader newbieId={newbieId} />
      </Header>
      <Box component='main' data-testid='task-list-page'>
        <TaskTabsContent
          loading={loading}
          onChange={onTaskChange}
          tasks={newbieTasks as Task[]}
        />
      </Box>
    </>
  );
};
export default NewbieTasksList;
