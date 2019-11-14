import React from 'react';
import AvatarHeader from 'components/AvatarHeader';
import NavBar from '../NavBar';

const TasksList: React.FC = () => {
  return (
    <div data-testid='task-list-page'>
      <NavBar type={'menu'} onClick={() => null} />
      <AvatarHeader />
    </div>
  );
};
export default TasksList;
