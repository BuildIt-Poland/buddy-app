import React from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles, Typography, CircularProgress, Box } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import TASK_DETAILS from 'graphql/task-details.graphql';
import { ROUTES } from 'shared/routes';
import { colors } from 'styles/theme';
import { TaskStatus, Query, QueryTaskArgs, QueryNewbieArgs } from 'buddy-app-schema';
import NavBar from '../NavBar';
import BackgroundShape, { BACKGROUND_SHAPE_HEGHT } from '../BackgroundShape';
import AppWrapper from '../AppWrapper';
import { TaskDetailsProps } from './types';

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: `calc(100% - ${BACKGROUND_SHAPE_HEGHT}rem)`,
  },
  header: {},
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
  const color = data && COLORS[data.task.status];

  const renderTaskDetails = () => (
    <Box className={wrapper} data-testid='task-details-page'>
      <Box className={header}>
        <Typography component='h2' variant='h2'>
          {data && data.task.title}
        </Typography>
      </Box>
      <Box className={description}>{data && data.task.description}</Box>
    </Box>
  );

  return (
    <AppWrapper data-testid='task-details-page'>
      <NavBar
        type='back'
        onClick={() =>
          props.history.push(ROUTES.BUDDY_TASKS_LIST.replace(':newbieId', newbieId))
        }
      />
      {loading && <CircularProgress />}
      {data && renderTaskDetails()}
      <BackgroundShape fill={color} />
    </AppWrapper>
  );
};

export default TaskDetails;
