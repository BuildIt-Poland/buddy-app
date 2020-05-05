import React from 'react';
import get from 'lodash/get';
import { useParams, Link } from 'react-router-dom';
import htmlParser from 'react-html-parser';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/react-hooks';
import { TASK_DETAILS } from 'graphql/task-details.graphql';
import { colors } from 'styles/theme';
import { useAuth } from 'contexts/AuthContext';
import { useSnackBar } from 'contexts/SnackbarContext';
import {
  UserRole,
  TaskStatus,
  Query,
  QueryTaskArgs,
  QueryNewbieArgs,
  NewbieTask,
  BuddyTask,
} from '@buddy-app/schema';
import useTaskStatusUpdate from 'hooks/useTaskStatusUpdate';
import { isBuddy, isNewbieTask, isTemplateTask } from 'utils';
import EditButton from 'atoms/EditButton';
import BackPageContainer from 'atoms/BackPageContainer';
import TaskDetailsPlaceHolder from 'atoms/TaskDetailsPlaceHolder';
import ReminderButton from 'atoms/ReminderButton';
import TaskCheckbox from 'atoms/TaskCheckbox';
import { ROUTES } from 'shared/routes';
import { TaskDetailsProps } from './types';
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

const TaskDetails: React.FC<TaskDetailsProps> = ({ history }) => {
  const {
    data: { role, userId },
  } = useAuth();
  const { newbieId, taskId } = useParams<QueryTaskArgs & QueryNewbieArgs>();
  const { wrapper, header, status, description } = useStyles();
  const { showSnackbar } = useSnackBar();
  const { loading, data } = useQuery<Query, QueryTaskArgs>(TASK_DETAILS, {
    variables: { taskId },
  });

  const EditRoutes = {
    [UserRole.Newbie]: ROUTES.BASE,
    [UserRole.Buddy]: ROUTES.BUDDY_EDIT_TASK.replace(':taskId', taskId),
    [UserRole.Talent]: ROUTES.TALENT_EDIT_TASK.replace(':taskId', taskId),
  };

  const [mutation] = useTaskStatusUpdate(newbieId || userId, {
    onCompleted: () => showSnackbar(DICTIONARY.SUCCESS_MESSAGE),
    onError: () => showSnackbar(DICTIONARY.ERROR_MESSAGE),
  });

  const updateTaskStatus = (task: NewbieTask | BuddyTask) => {
    if (data && isTemplateTask(data.task.newbie.name)) {
      showSnackbar(DICTIONARY.TEMPLATE_MESSAGE);
    } else {
      mutation(task);
    }
  };

  const taskType: string = get(data, 'task.__typename', '');
  const taskStatus: TaskStatus = get(data, 'task.status', TaskStatus.Uncompleted);
  const hasReminderBtn = isBuddy(role) && isNewbieTask(taskType) && isBuddy;
  const stausLabelStyles = {
    background: BACKGROUND_COLORS[taskStatus],
    color: TEXT_COLORS[taskStatus],
  };

  const renderTaskDetails = ({ task }: Query) => (
    <Box className={wrapper}>
      <Box className={header}>
        <Typography component='h2' variant='h2'>
          {task.title}
        </Typography>
        <TaskCheckbox
          task={task}
          size='large'
          onChange={updateTaskStatus}
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
    <BackPageContainer
      id='task-details-page'
      backGroundShape
      navItems={hasReminderBtn && <ReminderButton disabled />}>
      {loading && <TaskDetailsPlaceHolder />}
      {data && renderTaskDetails(data)}
      <Link to={EditRoutes[role]}>
        <EditButton
          aria-label='Edit task details'
          title={DICTIONARY.EDIT_BUTTON_TITLE}
        />
      </Link>
    </BackPageContainer>
  );
};

export default TaskDetails;
