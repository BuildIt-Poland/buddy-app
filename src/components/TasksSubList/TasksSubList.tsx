import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { QueryNewbieArgs } from 'buddy-app-schema';
import ListSubheader from '@material-ui/core/ListSubheader';
import { ROUTES } from 'shared/routes';
import TaskCheckbox from '../TaskCheckbox';
import { TasksSubListProps } from './types';

const TasksSubList: React.FC<TasksSubListProps> = ({
  tasks,
  title,
  tabIndex,
  onChange,
}) => {
  const { newbieId } = useParams<QueryNewbieArgs>();
  const getPath = (id: string) =>
    ROUTES.BUDDY_TASK_DETAILS.replace(':newbieId', newbieId).replace(':taskId', id);

  return (
    <>
      <ListSubheader disableSticky>
        <strong>
          {title} ({tasks.length})
        </strong>
      </ListSubheader>
      {tasks.map(({ id, title, status }) => (
        <Link key={id} to={{ pathname: getPath(id), state: { tabIndex } }}>
          <TaskCheckbox title={title} id={id} status={status} onChange={onChange} />
        </Link>
      ))}
    </>
  );
};

export default TasksSubList;
