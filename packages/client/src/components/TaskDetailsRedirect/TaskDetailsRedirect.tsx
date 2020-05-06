import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';

const TaskDetailsRedirect = () => {
  const {
    data: { role },
  } = useAuth();
  const path = window.location.pathname.replace(/[a-z]+/, role.toLowerCase());

  return <Redirect to={path} />;
};

export default TaskDetailsRedirect;
