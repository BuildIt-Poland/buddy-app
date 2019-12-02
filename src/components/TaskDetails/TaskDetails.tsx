import React from 'react';
import { useParams } from 'react-router-dom';
import AppWrapper from 'components/AppWrapper';

const TaskDetails: React.FC = () => {
  const { taskId } = useParams();

  return (
    <AppWrapper data-testid='task-details-page'>
      <h1>Task Details</h1>
      <p>ID: {taskId}</p>
    </AppWrapper>
  );
};

export default TaskDetails;
