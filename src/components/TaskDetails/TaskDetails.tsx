import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import htmlParser from 'react-html-parser';
import { makeStyles, Typography, Box, Chip } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { TASK_DETAILS } from 'graphql/task-details.graphql';
import { UPDATE_TASK_STATUS } from 'graphql/update-task-status.graphql';
import { ROUTES } from 'shared/routes';
import { colors } from 'styles/theme';
import {
  TaskStatus,
  Query,
  QueryTaskArgs,
  QueryNewbieArgs,
  Mutation,
} from 'buddy-app-schema';
import withSnackBar from 'decorators/withSnackBar';
import NavBar from '../NavBar';
import BackgroundShape from '../BackgroundShape';
import AppWrapper from '../AppWrapper';
import TaskCheckbox from '../TaskCheckbox';
import { TaskDetailsProps } from './types';
import DICTIONARY from './taskDetails.dictionary';

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkbox: {
    '& svg': {
      fontSize: theme.spacing(3),
    },
  },
  progress: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
  },
  status: {
    marginTop: theme.spacing(1),
    alignSelf: 'baseline',
    fontWeight: 'bold',
  },
  description: {
    marginTop: theme.spacing(3.5),
  },
}));

const BACKGROUND_COLORS = {
  [TaskStatus.Completed]: colors.custom.completed,
  [TaskStatus.Uncompleted]: colors.custom.uncompleted,
};

const TEXT_COLORS = {
  [TaskStatus.Completed]: colors.secondary.contrastText,
  [TaskStatus.Uncompleted]: colors.secondary.main,
};

const STATUS_TEXT = {
  [TaskStatus.Completed]: DICTIONARY.COMPLETED,
  [TaskStatus.Uncompleted]: DICTIONARY.UNCOMPLETED,
};

const TaskDetails: React.FC<TaskDetailsProps> = ({ history, showSnackbar }) => {
  const { taskId, newbieId } = useParams<QueryTaskArgs & QueryNewbieArgs>();
  const { wrapper, header, checkbox, progress, status, description } = useStyles();
  const { state } = useLocation();

  const { loading, data } = useQuery<Query, QueryTaskArgs>(TASK_DETAILS, {
    variables: { taskId },
  });
  const [
    updateTaskStatus,
    { loading: updateTaskLoading, error: updateTaskError },
  ] = useMutation<Mutation>(UPDATE_TASK_STATUS, {
    onCompleted: () => showSnackbar(DICTIONARY.SUCCESS_MESSAGE),
  });

  const defaultTabIndex = (state && state.tabIndex) || 0;
  const taskListPath = ROUTES.BUDDY_TASKS_LIST.replace(':newbieId', newbieId);
  const backgroundColor = data && BACKGROUND_COLORS[data.task.status];
  const textColor = data && TEXT_COLORS[data.task.status];
  const stausLabelStyles = {
    background: backgroundColor,
    color: textColor,
  };

  const onBackClick = () =>
    history.push({ pathname: taskListPath, state: { defaultTabIndex } });

  const onTaskCheckboxChange = (taskId: string) =>
    !updateTaskLoading &&
    updateTaskStatus({
      variables: {
        taskId,
      },
    });

  useEffect(() => {
    if (updateTaskError) {
      showSnackbar(DICTIONARY.ERROR_MESSAGE);
    }
  }, [updateTaskError, showSnackbar]);

  const renderTaskDetails = ({ task }: Query) => (
    <Box className={wrapper}>
      <Box className={header}>
        <Typography component='h2' variant='h2'>
          {task.title}
        </Typography>
        <TaskCheckbox
          id={taskId}
          className={checkbox}
          status={task.status}
          onChange={onTaskCheckboxChange}
        />
      </Box>
      <Chip
        className={status}
        size={'small'}
        label={STATUS_TEXT[task.status]}
        style={stausLabelStyles}
      />
      <Box className={description}>{htmlParser(task.description)}</Box>
    </Box>
  );

  return (
    <AppWrapper data-testid='task-details-page'>
      {(loading || updateTaskLoading) && (
        <LinearProgress className={progress} color='secondary' />
      )}
      <NavBar type='back' onClick={onBackClick} />
      {data && renderTaskDetails(data)}
      <BackgroundShape />
    </AppWrapper>
  );
};

export default withSnackBar(TaskDetails);
