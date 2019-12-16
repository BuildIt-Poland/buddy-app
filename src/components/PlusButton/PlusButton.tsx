import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { PlusButtonProps } from './types';

const useStyles = makeStyles(theme => ({
  button: {
    position: 'fixed',
    top: 'auto',
    left: 'auto',
    right: theme.spacing(2),
    bottom: theme.spacing(2),
  },
}));

const PlusButton = (props: PlusButtonProps) => {
  const { button } = useStyles();
  return (
    <Fab {...props} aria-label='add' className={button}>
      <AddIcon />
    </Fab>
  );
};

PlusButton.defaultProps = {
  color: 'primary',
  size: 'medium',
};

export default PlusButton;
