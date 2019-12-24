import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TaskStatus } from 'buddy-app-schema';
import Checkbox from '@material-ui/core/Checkbox';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import UncheckedCircleIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckedCircleIcon from '@material-ui/icons/CheckCircle';
import TaskOptions from 'components/TaskOptions';
import { TaskCheckboxProps } from './types';

const StyledListItem = withStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
  },
}))(ListItem);

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
  const preventDefault = (e: React.MouseEvent) => e.preventDefault();

  const CircleCheckbox = () => (
    <Checkbox
      className={className}
      color={'primary'}
      checked={isChecked}
      onChange={onCheckboxChange}
      disableRipple
      icon={<UncheckedCircleIcon />}
      checkedIcon={<CheckedCircleIcon />}
    />
  );

  return title ? (
    <StyledListItem button disableGutters>
      <ListItemIcon onClick={preventDefault}>
        <CircleCheckbox />
      </ListItemIcon>
      <ListItemText primary={text[status]} />
      <ListItemIcon onClick={preventDefault}>
        <TaskOptions />
      </ListItemIcon>
    </StyledListItem>
  ) : (
    <CircleCheckbox />
  );
};

export default TaskCheckbox;
