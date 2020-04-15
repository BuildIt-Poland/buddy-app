import React from 'react';
import { TaskStatus } from '@buddy-app/schema';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import UncheckedCircleIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckedCircleIcon from '@material-ui/icons/CheckCircle';
import { TaskCheckboxProps } from './types';

const useStyles = makeStyles(() => ({
  large: {
    fontSize: '3.25rem',
  },
  small: {
    fontSize: '2.25rem',
  },
}));

const TaskCheckbox: React.FC<TaskCheckboxProps> = ({
  task,
  size = 'default',
  onChange,
  hasRipple,
  edge,
}) => {
  const { large, small } = useStyles();
  const isChecked = task.status === TaskStatus.Completed;
  const sizeClassNames = {
    inherit: '',
    default: '',
    large,
    small,
  };

  const onCheckboxChange = () => onChange && onChange(task);

  return (
    <Checkbox
      color={'primary'}
      checked={isChecked}
      onChange={onCheckboxChange}
      disableRipple={!hasRipple}
      edge={edge}
      icon={<UncheckedCircleIcon className={sizeClassNames[size]} />}
      checkedIcon={<CheckedCircleIcon className={sizeClassNames[size]} />}
    />
  );
};

export default TaskCheckbox;
