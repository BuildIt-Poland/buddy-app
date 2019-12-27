import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core';
import TaskListItem from '../TaskListItem';
import { TasksSubListProps } from './types';

const useStyles = makeStyles(() => ({
  fullWidth: {
    width: '100%',
  },
}));

const TasksSubList: React.FC<TasksSubListProps> = ({
  tasks,
  title,
  tabIndex = 0,
  onChange,
  taskOptionHandlers,
}) => {
  const { pathname } = useLocation();
  const { fullWidth } = useStyles();

  const ListHeader = (
    <ListSubheader disableSticky>
      <strong>
        {title} ({tasks.length})
      </strong>
    </ListSubheader>
  );

  return (
    <ListItem disableGutters dense>
      <List dense className={fullWidth} subheader={ListHeader}>
        {tasks.map(({ id, title, status }) => (
          <ListItem disableGutters key={id}>
            <Link
              className={fullWidth}
              to={{ pathname: `${pathname}/${id}`, state: { tabIndex } }}>
              <TaskListItem
                id={id}
                title={title}
                status={status}
                onChange={onChange}
                taskOptionHandlers={taskOptionHandlers}
              />
            </Link>
          </ListItem>
        ))}
      </List>
    </ListItem>
  );
};

export default TasksSubList;
