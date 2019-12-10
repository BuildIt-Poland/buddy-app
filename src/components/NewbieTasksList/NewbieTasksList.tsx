import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import { createStyles } from '@material-ui/core';
import AvatarHeader from 'components/AvatarHeader';
import makeStyles from '@material-ui/core/styles/makeStyles';
import NavBar from 'components/NavBar';
import { useQuery, useMutation } from '@apollo/react-hooks';
import SnackbarContext, { SnackbarContextData } from 'contexts/SnackbarContext';
import { QueryNewbieArgs, Query, Task, Mutation } from 'buddy-app-schema';
import { TASK_LIST } from 'graphql/task-list.graphql';
import { UPDATE_TASK_STATUS } from 'graphql/update-task-status.graphql';
import AuthContext, { AuthContextData } from 'contexts/AuthContext';
import Box from '@material-ui/core/Box';
import TaskTabsContent from 'components/TaskTabsContent';
import LinearProgress from '@material-ui/core/LinearProgress';
import DICTIONARY from './dictionary';

const useStyles = makeStyles(() =>
  createStyles({
    rounded: {
      borderRadius: '0 0 100% 100%',
      width: '110%',
      marginLeft: '-5%',
    },
  })
);

const NewbieTasksList: React.FC = () => {
  const { rounded } = useStyles();
  const { data: AuthData } = useContext<AuthContextData>(AuthContext);
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
    <Box component='main' data-testid='task-list-page'>
      {updateTaskLoading && <LinearProgress />}
      <NavBar type={'menu'} />
      <AppBar
        component='section'
        position='static'
        color='inherit'
        className={rounded}>
        <AvatarHeader newbieId={newbieId} />
      </AppBar>

      <TaskTabsContent
        loading={loading}
        onChange={onTaskChange}
        tasks={newbieTasks as Task[]}
      />
    </Box>
  );
};
export default NewbieTasksList;
