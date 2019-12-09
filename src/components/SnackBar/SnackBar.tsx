import React, { useContext } from 'react';
import MuiSnackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SnackbarContext, { SnackbarContextData } from 'contexts/SnackbarContext';

const SnackBar: React.FC = () => {
  const { isOpen, message, hideSnackbar } = useContext<SnackbarContextData>(
    SnackbarContext
  );

  const onClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason !== 'clickaway') {
      hideSnackbar();
    }
  };

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
      onClose={hideSnackbar}
      action={[
        <IconButton key='close' aria-label='close' color='inherit' onClick={onClose}>
          <CloseIcon />
        </IconButton>,
      ]}
    />
  );
};
export default SnackBar;
