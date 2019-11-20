import React, { useMemo } from 'react';
import { Box } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { TaskStatus } from 'buddy-app-schema';
import TasksSubList, { TasksSubListProps } from '../TasksSubList';
import { TaskTabsContentProps, TransformedTasks } from './types';
import DICTIONARY from './tasksTabsContent.dictionary';

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
});

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

const TaskTabsContent: React.FC<TaskTabsContentProps> = ({
  tasks,
  uncompletedCount,
  completedCount,
  onChange,
}) => {
  const { wrapper } = useStyles();

  const { uncompletedTasks, completedTasks } = useMemo(() => transformTasks(tasks), [
    tasks,
  ]);
  const tasksList: TasksSubListProps[] = [
    {
      title: DICTIONARY.TITLE_UNCOMPLETED,
      count: uncompletedCount,
      tasks: uncompletedTasks,
    },
    {
      title: DICTIONARY.TITLE_COMPLETED,
      count: completedCount,
      tasks: completedTasks,
    },
  ];

  return (
    <Box className={wrapper}>
      {tasksList.map((props, key) =>
        props.count ? (
          <TasksSubList key={key} onChange={onChange} {...props} />
        ) : null
      )}
    </Box>
  );
};

export default TaskTabsContent;
