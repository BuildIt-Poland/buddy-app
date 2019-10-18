import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface AlertDialogProps {
  message?: string;
  title?: string;
}

const AlertDialog = ({ title, message }: AlertDialogProps) => {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} data-testid='alert-dialog'>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>
        {message && (
          <DialogContentText variant={'body2'} style={{ whiteSpace: 'pre-line' }}>
            {message}
          </DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          color='primary'
          data-testid='alert-dialog-close'>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
