import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { TaskStatus } from '@buddy-app/schema';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TaskOptions from 'components/TaskOptions';
import TaskCheckbox from 'atoms/TaskCheckbox';
import { TaskListItemProps } from './types';

const useStyles = makeStyles(theme => ({
  listItem: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(0.5),
    },
  },
  listOption: {
    justifyContent: 'flex-end',
  },
}));

const TaskListItem: React.FC<TaskListItemProps> = ({
  task,
  tabIndex = 0,
  onChange,
}) => {
  const { id, title, status } = task;
  const { pathname } = useLocation();
  const history = useHistory();
  const { listItem, listOption } = useStyles();
  const text = {
    [TaskStatus.Completed]: <del>{title}</del>,
    [TaskStatus.Uncompleted]: <strong>{title}</strong>,
  };
  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();
  const listItemClickHandler = () =>
    history.push({ pathname: `${pathname}/${id}`, state: { tabIndex } });

  return (
    <ListItem
      disableGutters
      button
      className={listItem}
      onClick={listItemClickHandler}
      component='li'>
      <ListItemIcon onClick={stopPropagation}>
        <TaskCheckbox task={task} onChange={onChange} />
      </ListItemIcon>
      <ListItemText primary={text[status]} />
      <ListItemIcon className={listOption} onClick={stopPropagation}>
        <TaskOptions id={id} />
      </ListItemIcon>
    </ListItem>
  );
};

export default TaskListItem;
