import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TaskStatus } from 'buddy-app-schema';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TaskOptions from 'components/TaskOptions';
import TaskCheckbox from 'components/TaskCheckbox';
import { TaskListItemProps } from './types';

const StyledListItem = withStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
  },
}))(ListItem);

const TaskListItem: React.FC<TaskListItemProps> = ({
  id,
  title,
  status,
  onChange,
  taskOptionHandlers,
}) => {
  const text = {
    [TaskStatus.Completed]: <del>{title}</del>,
    [TaskStatus.Uncompleted]: <strong>{title}</strong>,
  };
  const preventDefault = (e: React.MouseEvent) => e.preventDefault();

  return (
    <StyledListItem button disableGutters>
      <ListItemIcon onClick={preventDefault}>
        <TaskCheckbox id={id} status={status} onChange={onChange} />
      </ListItemIcon>
      <ListItemText primary={text[status]} />
      <ListItemIcon onClick={preventDefault}>
        <TaskOptions id={id} taskOptionHandlers={taskOptionHandlers} />
      </ListItemIcon>
    </StyledListItem>
  );
};

export default TaskListItem;
