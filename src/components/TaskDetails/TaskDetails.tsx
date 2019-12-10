import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import htmlParser from 'react-html-parser';
import { makeStyles, Typography, Box, Chip } from '@material-ui/core';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { TASK_DETAILS } from 'graphql/task-details.graphql';
import { UPDATE_TASK_STATUS } from 'graphql/update-task-status.graphql';
import { colors } from 'styles/theme';
import {
  TaskStatus,
  Query,
  QueryTaskArgs,
  QueryNewbieArgs,
  Mutation,
} from 'buddy-app-schema';
import withSnackBar from 'decorators/withSnackBar';
import PageContainer from 'components/PageContainer';
import Header from 'components/Header';
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
  const { taskId } = useParams<QueryTaskArgs & QueryNewbieArgs>();
  const { wrapper, header, checkbox, status, description } = useStyles();
  const { pathname, state } = useLocation();

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
  const taskListPath = pathname.replace(/tasks.+/, 'tasks');
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
    <>
      <Header type={'back'} onButtonClick={onBackClick} />
      <PageContainer
        loading={loading || updateTaskLoading}
        data-testid='task-details-page'
        backGroundShape>
        {data && renderTaskDetails(data)}
      </PageContainer>
    </>
  );
};

export default withSnackBar(TaskDetails);
