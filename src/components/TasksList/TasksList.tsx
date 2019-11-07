import React from 'react';
import TaskCheckbox from '../TaskCheckbox/TaskCheckbox';

const TasksList: React.FC = () => {
  return (
    <>
      <h1>Tasks List</h1>
      <TaskCheckbox label={'Change you line manager'} state={'todo'} />
    </>
  );
};
export default TasksList;
