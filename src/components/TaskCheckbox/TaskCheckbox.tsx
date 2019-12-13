import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { TaskStatus } from 'buddy-app-schema';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import UncheckedCircleIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckedCircleIcon from '@material-ui/icons/CheckCircle';
import { TaskCheckboxProps } from './types';

const TaskCheckbox: React.FC<TaskCheckboxProps> = ({
  id,
  className,
  title,
  status,
  onChange,
}) => {
  const isChecked = status === TaskStatus.Completed;
  const text = {
    [TaskStatus.Completed]: <del>{title}</del>,
    [TaskStatus.Uncompleted]: <strong>{title}</strong>,
  };
  const onCheckboxChange = () => onChange && onChange(id);

  const renderCheckbox = () => (
    <Checkbox
      className={className}
      color={'primary'}
      checked={isChecked}
      onChange={onCheckboxChange}
      disableRipple
      onClick={e => e.stopPropagation()}
      icon={<UncheckedCircleIcon />}
      checkedIcon={<CheckedCircleIcon />}
    />
  );

  return title ? (
    <ListItem button>
      <ListItemIcon>{renderCheckbox()}</ListItemIcon>
      <ListItemText primary={text[status]} />
    </ListItem>
  ) : (
    renderCheckbox()
  );
};

export default TaskCheckbox;
