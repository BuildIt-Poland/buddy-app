import React from 'react';
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
  tabIndex,
  onChange,
  taskOptionHandlers,
}) => {
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
        {tasks.map(task => (
          <TaskListItem
            key={task.id}
            task={task}
            onChange={onChange}
            tabIndex={tabIndex}
            taskOptionHandlers={taskOptionHandlers}
          />
        ))}
      </List>
    </ListItem>
  );
};

export default TasksSubList;
