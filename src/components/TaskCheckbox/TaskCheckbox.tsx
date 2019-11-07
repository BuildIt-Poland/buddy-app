import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { Box, Typography } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Task } from '../../../server/src/generated/schema-types';
import { TaskCheckBoxOwnProps, TaskStatus } from './types';

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  titleWrapper: {
    position: 'relative',
  },
  line: {
    width: '100%',
    position: 'absolute',
    height: '1px',
    backgroundColor: 'rgba(0, 0, 0, 0.28)',
    top: '12px',
  },
});

const TaskCheckbox: React.FC<Partial<Task> & TaskCheckBoxOwnProps> = ({
  id,
  title,
  status,
  onChange,
}) => {
  const { wrapper, line, titleWrapper } = useStyles();

  const isChecked = (status: TaskStatus) => status === TaskStatus.Completed;

  return (
    <Box className={wrapper}>
      <Checkbox
        color='primary'
        checked={isChecked(status as TaskStatus)}
        onChange={() => onChange(id as string)}
        value={id}
        inputProps={{
          'aria-label': 'primary checkbox',
        }}
      />
      <Box className={titleWrapper}>
        <Typography component='h4' variant='body1'>
          <Box
            fontWeight={
              isChecked(status as TaskStatus)
                ? 'fontWeightRegular'
                : 'fontWeightBold'
            }>
            {title}
          </Box>
          {isChecked(status as TaskStatus) && <div className={line} />}
        </Typography>
      </Box>
    </Box>
  );
};

export default TaskCheckbox;
