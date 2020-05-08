import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import { EditButtonProps } from './types';

const useStyles = makeStyles(theme => ({
  button: {
    position: 'fixed',
    top: 'auto',
    left: 'auto',
    right: theme.spacing(2),
    bottom: theme.spacing(2),
  },
}));

const EditButton = (props: EditButtonProps) => {
  const { button } = useStyles();
  return (
    <Fab {...props} aria-label='edit' className={button}>
      <EditIcon />
    </Fab>
  );
};

EditButton.defaultProps = {
  color: 'primary',
  size: 'medium',
};

export default EditButton;
