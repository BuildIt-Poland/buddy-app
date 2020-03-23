import React from 'react';
import MuiSnackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { SnackBarProps } from './types';

const SnackBar: React.FC<SnackBarProps> = ({ isOpen, message, onClose }) => {
  return (
    <MuiSnackbar
      data-testid='snack-bar'
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={isOpen}
      autoHideDuration={3000}
      message={<span>{message}</span>}
      onClose={onClose}
      action={[
        <IconButton key='close' aria-label='close' color='inherit' onClick={onClose}>
          <CloseIcon />
        </IconButton>,
      ]}
    />
  );
};
export default SnackBar;
