import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PlusButton from 'atoms/PlusButton';
import { AddTasksButtonProps } from './types';

const useStyles = makeStyles(theme => ({
  button: {
    position: 'fixed',
    top: 'auto',
    left: 'auto',
    right: theme.spacing(2),
    bottom: theme.spacing(2),
  },
}));

const AddTasksButton = (props: AddTasksButtonProps) => {
  const { button } = useStyles();
  const handleClick = () => console.log(props.to);
  return <PlusButton {...props} onClick={handleClick} />;
};

export default AddTasksButton;
