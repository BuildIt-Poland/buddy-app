import React, { useMemo } from 'react';
import List from '@material-ui/core/List';
import { TaskStatus } from '@buddy-app/schema';
import TaskListPlaceHolder from 'atoms/TaskListPlaceHolder';
import TasksSubList, { TasksSubListProps } from 'atoms/TasksSubList';
import EmptyState from 'atoms/EmptyState';
import { TaskTabsContentProps, TransformedTasks } from './types';
import DICTIONARY from './dictionary';

const transformTasks = (tasks: TaskTabsContentProps['tasks']): TransformedTasks => {
  const emptyTransformedTasks = {
    uncompletedTasks: [],
    completedTasks: [],
  } as TransformedTasks;

  if (tasks) {
    return tasks.reduce((result, task) => {
      if (task.status === TaskStatus.Completed) {
        result.completedTasks.push(task);
      } else {
        result.uncompletedTasks.push(task);
      }
      return result;
    }, emptyTransformedTasks);
  } else {
    return emptyTransformedTasks;
  }
};

const TaskTabsContent: React.FC<TaskTabsContentProps> = ({
  tasks,
  onChange,
  loading,
  tabIndex = 0,
}) => {
  const { uncompletedTasks, completedTasks } = useMemo(() => transformTasks(tasks), [
    tasks,
  ]);
  const tasksList: TasksSubListProps[] = [
    {
      title: DICTIONARY.TITLE_UNCOMPLETED,
      tasks: uncompletedTasks,
    },
    {
      title: DICTIONARY.TITLE_COMPLETED,
      tasks: completedTasks,
    },
  ];
  const isEmptyList = uncompletedTasks.length === 0 && completedTasks.length === 0;

  return (
    <>
      {loading && <TaskListPlaceHolder />}
      {!loading && isEmptyList && <EmptyState />}
      {!loading && !isEmptyList && (
        <List>
          {tasksList.map((props, key) => (
            <TasksSubList
              key={key}
              onChange={onChange}
              tabIndex={tabIndex}
              {...props}
            />
          ))}
        </List>
      )}
    </>
  );
};

export default TaskTabsContent;
