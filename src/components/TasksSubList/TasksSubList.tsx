import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import TaskCheckbox from '../TaskCheckbox';
import { TasksSubListProps } from './types';

const TasksSubList: React.FC<TasksSubListProps> = ({
  tasks,
  title,
  tabIndex = 0,
  onChange,
}) => {
  const { pathname } = useLocation();

  const ListHeader = (
    <ListSubheader disableSticky>
      <strong>
        {title} ({tasks.length})
      </strong>
    </ListSubheader>
  );

  return (
    <ListItem disableGutters dense>
      <List dense subheader={ListHeader}>
        {tasks.map(({ id, title, status }) => (
          <ListItem disableGutters key={id}>
            <Link to={{ pathname: `${pathname}/${id}`, state: { tabIndex } }}>
              <TaskCheckbox
                id={id}
                title={title}
                status={status}
                onChange={onChange}
              />
            </Link>
          </ListItem>
        ))}
      </List>
    </ListItem>
  );
};

export default TasksSubList;
