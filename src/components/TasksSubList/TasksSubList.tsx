import React from 'react';
import ListSubheader from '@material-ui/core/ListSubheader';
import TaskCheckbox from '../TaskCheckbox';
import { TasksSubListProps } from './types';

const TasksSubList: React.FC<TasksSubListProps> = ({ tasks, title, onChange }) => {
  return (
    <>
      <ListSubheader>
        <strong>
          {title} ({tasks.length})
        </strong>
      </ListSubheader>
      {tasks.map(({ id, title, status }) => (
        <TaskCheckbox
          key={id}
          title={title}
          id={id}
          status={status}
          onChange={onChange}
        />
      ))}
    </>
  );
};

export default TasksSubList;