import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ListSubheader from '@material-ui/core/ListSubheader';
import TaskCheckbox from '../TaskCheckbox';
import { TasksSubListProps } from './types';

const TasksSubList: React.FC<TasksSubListProps> = ({
  tasks,
  title,
  tabIndex = 0,
  onChange,
}) => {
  const { pathname } = useLocation();

  return (
    <>
      <ListSubheader disableSticky>
        <strong>
          {title} ({tasks.length})
        </strong>
      </ListSubheader>
      {tasks.map(({ id, title, status }) => (
        <Link key={id} to={{ pathname: `${pathname}/${id}`, state: { tabIndex } }}>
          <TaskCheckbox title={title} id={id} status={status} onChange={onChange} />
        </Link>
      ))}
    </>
  );
};

export default TasksSubList;
