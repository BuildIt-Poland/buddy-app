import React from 'react';
import { Link } from 'react-router-dom';
import Checkbox from '@material-ui/core/Checkbox';
import { TaskStatus } from 'buddy-app-schema';
import { ROUTES } from 'shared/routes';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { TaskCheckboxProps } from './types';

const TaskCheckbox: React.FC<TaskCheckboxProps> = ({
  id,
  title,
  status,
  onChange,
}) => {
  const isChecked = status === TaskStatus.Completed;
  const path = ROUTES.BUDDY_TASK_DETAILS.replace(':newbieId', id).replace(
    ':taskId',
    id
  );

  const onCheckboxChange = () => onChange && onChange(id);

  return (
    <Link to={path}>
      <ListItem button>
        <ListItemIcon>
          <Checkbox
            color={'primary'}
            checked={isChecked}
            onChange={onCheckboxChange}
            disableRipple
            onClick={e => e.stopPropagation()}
          />
        </ListItemIcon>
        {isChecked ? (
          <ListItemText primary={<del>{title}</del>} />
        ) : (
          <ListItemText primary={<strong>{title}</strong>} />
        )}
      </ListItem>
    </Link>
  );
};

export default TaskCheckbox;
