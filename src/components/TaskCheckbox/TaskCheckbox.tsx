import React from 'react';
import { TaskStatus } from 'buddy-app-schema';
import Checkbox from '@material-ui/core/Checkbox';
import UncheckedCircleIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckedCircleIcon from '@material-ui/icons/CheckCircle';
import { TaskCheckboxProps } from './types';

const TaskCheckbox: React.FC<TaskCheckboxProps> = ({
  id,
  status,
  size = 'default',
  onChange,
  hasRipple,
  edge,
}) => {
  const isChecked = status === TaskStatus.Completed;
  const onCheckboxChange = () => onChange && onChange(id);

  return (
    <Checkbox
      color={'primary'}
      checked={isChecked}
      onChange={onCheckboxChange}
      disableRipple={!hasRipple}
      edge={edge}
      icon={<UncheckedCircleIcon fontSize={size} />}
      checkedIcon={<CheckedCircleIcon fontSize={size} />}
    />
  );
};

export default TaskCheckbox;
