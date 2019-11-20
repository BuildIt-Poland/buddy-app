import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Checkbox from '@material-ui/core/Checkbox';
import { Box, Typography } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { TaskStatus, QueryNewbieArgs } from 'buddy-app-schema';
import { colors } from 'styles/theme';
import { ROUTES } from 'shared/routes';
import { TaskCheckboxProps } from './types';

const LINE_THROUGH_HEIGHT = 0.1;

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
    zIndex: -1,
    height: `${LINE_THROUGH_HEIGHT}rem`,
    backgroundColor: colors.custom.lightText,
    top: `calc(50% - ${LINE_THROUGH_HEIGHT / 2}rem)`,
  },
  linkText: {
    '&:hover': {
      color: colors.primary.main,
    },
  },
});

const TaskCheckbox: React.FC<TaskCheckboxProps> = ({
  id,
  title,
  status,
  onChange,
}) => {
  const { wrapper, line, titleWrapper, linkText } = useStyles();
  const { newbieId } = useParams<QueryNewbieArgs>();

  const isChecked = status === TaskStatus.Completed;
  const fontWeight = isChecked ? 'fontWeightRegular' : 'fontWeightBold';
  const path = ROUTES.BUDDY_TASK_DETAILS.replace(':newbieId', newbieId).replace(
    ':taskId',
    id
  );

  const onCheckboxChange = () => onChange && onChange(id);

  return (
    <Box className={wrapper}>
      <Checkbox
        color='primary'
        checked={isChecked}
        onChange={onCheckboxChange}
        value={id}
        aria-label='primary checkbox'
      />
      <Box className={titleWrapper}>
        <Typography component='h4' variant='body1'>
          <Link to={path}>
            <Box className={linkText} fontWeight={fontWeight}>
              {title}
            </Box>
          </Link>
          {isChecked && <div className={line} />}
        </Typography>
      </Box>
    </Box>
  );
};

export default TaskCheckbox;
