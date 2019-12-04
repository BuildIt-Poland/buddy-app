import React, { useMemo } from 'react';
import List from '@material-ui/core/List';
import { TaskStatus } from 'buddy-app-schema';
import TaskListPlaceHolder from 'components/TaskListPlaceHolder';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TasksSubList, { TasksSubListProps } from '../TasksSubList';
import { TaskTabsContentProps, TransformedTasks } from './types';
import DICTIONARY from './tasksTabsContent.dictionary';
import TASK_TABS_CONTENT_DICTIONARY from './taskTabsContent.dictionary';

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
  tabIndex,
}) => {
  const { uncompletedTasks, completedTasks } = useMemo(() => transformTasks(tasks), [
    tasks,
  ]);
  const tasksList: TasksSubListProps[] = [
    {
      title: DICTIONARY.TITLE_UNCOMPLETED,
      tasks: uncompletedTasks,
      tabIndex,
    },
    {
      title: DICTIONARY.TITLE_COMPLETED,
      tasks: completedTasks,
      tabIndex,
    },
  ];
  const isEmptyList = uncompletedTasks.length === 0 && completedTasks.length === 0;

  const EmptyStateTaskList = () => (
    <Box textAlign={'center'}>
      <Typography variant={'h2'} component={'h2'}>
        {TASK_TABS_CONTENT_DICTIONARY.NO_TASKS_TITLE}
      </Typography>
      <Typography>{TASK_TABS_CONTENT_DICTIONARY.NO_TASKS_SUBTITLE}</Typography>
    </Box>
  );

  return (
    <>
      {loading && <TaskListPlaceHolder />}
      {!loading && isEmptyList && <EmptyStateTaskList />}
      {!loading && !isEmptyList && (
        <List>
          {tasksList.map((props, key) => (
            <TasksSubList key={key} onChange={onChange} {...props} />
          ))}
        </List>
      )}
    </>
  );
};

export default TaskTabsContent;
