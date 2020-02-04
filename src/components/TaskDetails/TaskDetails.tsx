import React from 'react';
import get from 'lodash/get';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import htmlParser from 'react-html-parser';
import { makeStyles, Typography, Box, Chip } from '@material-ui/core';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { TASK_DETAILS } from 'graphql/task-details.graphql';
import { UPDATE_TASK_STATUS } from 'graphql/update-task-status.graphql';
import { colors } from 'styles/theme';
import { useAuth } from 'contexts/AuthContext';
import { useSnackBar } from 'contexts/SnackbarContext';
import {
  TaskStatus,
  Query,
  QueryTaskArgs,
  QueryNewbieArgs,
  Mutation,
} from 'buddy-app-schema';
import { isBuddy, isNewbieTask } from 'utils';
import PageContainer from 'components/PageContainer';
import ReminderButton from 'components/ReminderButton';
import Header, { MenuTypes } from 'components/Header';
import TaskCheckbox from '../TaskCheckbox';
import DICTIONARY from './dictionary';

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

const TaskDetails: React.FC = () => {
  const [
    {
      data: { role },
    },
  ] = useAuth();
  const { taskId } = useParams<QueryTaskArgs & QueryNewbieArgs>();
  const { wrapper, header, status, description } = useStyles();
  const { pathname, state } = useLocation();
  const { showSnackbar } = useSnackBar();
  const history = useHistory();
  const { loading, data } = useQuery<Query, QueryTaskArgs>(TASK_DETAILS, {
    variables: { taskId },
  });

  const [updateTaskStatus, { loading: updateTaskLoading }] = useMutation<Mutation>(
    UPDATE_TASK_STATUS,
    {
      onCompleted: () => showSnackbar(DICTIONARY.SUCCESS_MESSAGE),
      onError: () => showSnackbar(DICTIONARY.ERROR_MESSAGE),
    }
  );

  const taskType: string = get(data, 'task.__typename', '');
  const taskStatus: TaskStatus = get(data, 'task.status', TaskStatus.Uncompleted);
  const hasReminderBtn = isBuddy(role) && isNewbieTask(taskType) && isBuddy;
  const defaultTabIndex = (state && state.tabIndex) || 0;
  const taskListPath = pathname.replace(/tasks.+/, 'tasks');
  const stausLabelStyles = {
    background: BACKGROUND_COLORS[taskStatus],
    color: TEXT_COLORS[taskStatus],
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

  const renderTaskDetails = ({ task }: Query) => (
    <Box className={wrapper}>
      <Box className={header}>
        <Typography component='h2' variant='h2'>
          {task.title}
        </Typography>
        <TaskCheckbox
          id={taskId}
          size='large'
          status={task.status}
          onChange={onTaskCheckboxChange}
          edge='end'
          hasRipple
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
      <Header
        type={MenuTypes.BACK}
        loading={loading || updateTaskLoading}
        onButtonClick={onBackClick}
        navItems={hasReminderBtn && <ReminderButton disabled />}
      />
      <PageContainer data-testid='task-details-page' backGroundShape>
        {data && renderTaskDetails(data)}
      </PageContainer>
    </>
  );
};

export default TaskDetails;
