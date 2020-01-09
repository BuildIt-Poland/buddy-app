import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContext, { DialogContextData } from 'contexts/DialogContext';

const AlertDialog: React.FC = () => {
  const { isOpen, title, message, onConfirm, hideDialog } = useContext<
    DialogContextData
  >(DialogContext);

  return (
    <Dialog open={isOpen} onClose={hideDialog} data-testid='alert-dialog'>
      {title && (
        <DialogTitle>
          <strong>{title}</strong>
        </DialogTitle>
      )}
      <DialogContent>
        <DialogContentText variant={'body2'} style={{ whiteSpace: 'pre-line' }}>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={hideDialog}
          color='primary'
          data-testid='alert-dialog-close'>
          Close
        </Button>
        {onConfirm && (
          <Button
            onClick={onConfirm}
            color='primary'
            data-testid='alert-dialog-confirm'>
            Confirm
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
