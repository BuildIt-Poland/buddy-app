import React, { useMemo } from 'react';
import List from '@material-ui/core/List';
import { TaskStatus } from 'buddy-app-schema';
import TasksSubList, { TasksSubListProps } from '../TasksSubList';
import { TaskTabsContentProps, TransformedTasks } from './types';
import DICTIONARY from './tasksTabsContent.dictionary';

const transformTasks = (tasks: TaskTabsContentProps['tasks']): TransformedTasks =>
  tasks.reduce(
    (result, task) => {
      if (task.status === TaskStatus.Completed) {
        result.completedTasks.push(task);
      } else {
        result.uncompletedTasks.push(task);
      }
      return result;
    },
    {
      uncompletedTasks: [],
      completedTasks: [],
    } as TransformedTasks
  );

const TaskTabsContent: React.FC<TaskTabsContentProps> = ({ tasks, onChange }) => {
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

  return (
    <List>
      {tasksList.map((props, key) => (
        <TasksSubList key={key} onChange={onChange} {...props} />
      ))}
    </List>
  );
};

export default TaskTabsContent;
