import React from 'react';
import { useParams } from 'react-router-dom';

const TaskDetails: React.FC = () => {
  const { taskId } = useParams();

  return (
    <>
      <h1>Task Details</h1>
      <p>ID: {taskId}</p>
    </>
  );
};

export default TaskDetails;
