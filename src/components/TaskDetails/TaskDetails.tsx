import React from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles, Typography, CircularProgress, Box } from '@material-ui/core';
import { useQuery, useMutation } from '@apollo/react-hooks';
import TASK_DETAILS from 'graphql/task-details.graphql';
import { ROUTES } from 'shared/routes';
import { colors } from 'styles/theme';
import {
  TaskStatus,
  Query,
  QueryTaskArgs,
  QueryNewbieArgs,
  Mutation,
} from 'buddy-app-schema';
import UPDATE_TASK_STATUS_MUTATION from 'graphql/update-task-status.graphql';
import NavBar from '../NavBar';
import BackgroundShape, { BACKGROUND_SHAPE_HEGHT } from '../BackgroundShape';
import AppWrapper from '../AppWrapper';
import TaskCheckbox from '../TaskCheckbox';
import { TaskDetailsProps } from './types';

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: `calc(100% - ${BACKGROUND_SHAPE_HEGHT}rem)`,
  },
  header: { display: 'flex' },
  description: {
    display: 'flex',
    marginTop: theme.spacing(2),
    overflow: 'auto',
  },
}));

const COLORS = {
  [TaskStatus.Completed]: colors.custom.completed,
  [TaskStatus.Uncompleted]: colors.custom.uncompleted,
};

const TaskDetails: React.FC<TaskDetailsProps> = props => {
  const { taskId, newbieId } = useParams<QueryTaskArgs & QueryNewbieArgs>();
  const { wrapper, header, description } = useStyles();
  const { loading, data } = useQuery<Query, QueryTaskArgs>(TASK_DETAILS, {
    variables: { taskId },
  });
  const [updateTaskStatusMutation, mutation] = useMutation<Mutation>(
    UPDATE_TASK_STATUS_MUTATION,
    {
      update(store, { data: response }) {
        const cachedResponse: Query | null = store.readQuery({
          query: TASK_DETAILS,
          variables: { taskId },
        });

        response &&
          cachedResponse &&
          store.writeQuery({
            query: TASK_DETAILS,
            variables: { taskId },
            data: {
              ...cachedResponse,
              task: { ...cachedResponse.task, ...response.updateTaskStatus },
            },
          });
      },
    }
  );
  const color = data && COLORS[data.task.status];

  const onBackClick = () =>
    props.history.push(ROUTES.BUDDY_TASKS_LIST.replace(':newbieId', newbieId));

  const onTaskCheckboxChange = () =>
    updateTaskStatusMutation({
      variables: {
        taskId,
      },
    });

  const renderTaskDetails = ({ task }: Query) => (
    <Box className={wrapper} data-testid='task-details-page'>
      <Box className={header}>
        <Typography component='h2' variant='h2'>
          {task.title}
        </Typography>
        <TaskCheckbox
          id={taskId}
          status={task.status}
          onChange={onTaskCheckboxChange}
        />
      </Box>
      <Box className={description}>{task.description}</Box>
    </Box>
  );

  return (
    <AppWrapper data-testid='task-details-page'>
      <NavBar type='back' onClick={onBackClick} />
      {(loading || mutation.loading) && <CircularProgress />}
      {data && renderTaskDetails(data)}
      <BackgroundShape fill={color} />
    </AppWrapper>
  );
};

export default TaskDetails;
