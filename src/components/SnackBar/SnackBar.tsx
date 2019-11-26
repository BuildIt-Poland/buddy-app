import React from 'react';
import MuiSnackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { SnackBarProps } from './types';

const SnackBar: React.FC<SnackBarProps> = ({
  message,
  isOpen,
  onClickCloseButton,
}) => {
  return (
    <MuiSnackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={isOpen}
      autoHideDuration={3000}
      message={<span>{message}</span>}
      action={[
        <IconButton
          key='close'
          aria-label='close'
          color='inherit'
          onClick={onClickCloseButton}>
          <CloseIcon />
        </IconButton>,
      ]}
    />
  );
};

export default SnackBar;
