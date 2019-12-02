import React, { useState } from 'react';
import MuiSnackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { SnackBarProps } from './types';

const withSnackBar = (WrappedComponent: React.FC<SnackBarProps & any>) => {
  const SnackBar: React.FC = props => {
    const [snackbar, setSnackbar] = useState({
      isOpen: false,
      message: '',
    });

    const showSnackbar = (message: string) => setSnackbar({ isOpen: true, message });

    const hideSnackbar = () => setSnackbar({ ...snackbar, isOpen: false });

    const onClose = (
      event: React.SyntheticEvent | React.MouseEvent,
      reason?: string
    ) => {
      if (reason !== 'clickaway') {
        hideSnackbar();
      }
    };

    return (
      <>
        <WrappedComponent {...props} showSnackbar={showSnackbar} />
        <MuiSnackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={snackbar.isOpen}
          autoHideDuration={3000}
          message={<span>{snackbar.message}</span>}
          onClose={hideSnackbar}
          action={[
            <IconButton
              key='close'
              aria-label='close'
              color='inherit'
              onClick={onClose}>
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </>
    );
  };
  return SnackBar;
};

export default withSnackBar;
