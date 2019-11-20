import React from 'react';
import { Box, Typography } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { colors } from 'styles/theme';
import TaskCheckbox from '../TaskCheckbox';
import { TasksStatusListProps } from './types';

const useStyles = makeStyles({
  header: {
    margin: '1rem 0',
    color: colors.custom.lightText,
  },
});

const TasksStatusList: React.FC<TasksStatusListProps> = ({
  tasks,
  count,
  title,
  onChange,
}) => {
  const { header } = useStyles();

  return (
    <Box>
      <Typography className={header} component='h4' variant='h4'>
        {title} ({count || 0})
      </Typography>
      <Box>
        {tasks.map(({ id, title, status }) => (
          <TaskCheckbox
            key={id}
            title={title}
            id={id}
            status={status}
            onChange={onChange}
          />
        ))}
      </Box>
    </Box>
  );
};

export default TasksStatusList;
