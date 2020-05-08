import React from 'react';
import { useParams } from 'react-router-dom';
import { QueryBuddyArgs } from '@buddy-app/schema';
import RemoveCircleOutline from '@material-ui/icons/RemoveCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import { useAuth } from 'contexts/AuthContext';
import { useDialog } from 'contexts/DialogContext';
import { useSnackBar } from 'contexts/SnackbarContext';
import useUserDelete from 'hooks/useUserDelete';
import { DeleteUserProps } from './types';
import DICTIONARY from './dictionary';
/* istanbul ignore file */
const DeleteUser: React.FC<DeleteUserProps> = ({ userId, userRole }) => {
  const { buddyId } = useParams<QueryBuddyArgs>();
  const { data } = useAuth();
  const { showDialog } = useDialog();
  const { showSnackbar } = useSnackBar();

  const [deleteUser] = useUserDelete(buddyId || data.userId, data.role, userRole, {
    onCompleted: () => showSnackbar(DICTIONARY.DELETE_SNACKBAR.SUCCESS),
    onError: () => showSnackbar(DICTIONARY.DELETE_SNACKBAR.ERROR),
  });

  const onDeleteHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    showDialog(
      DICTIONARY.DELETE_DIALOG.MESSAGE,
      DICTIONARY.DELETE_DIALOG.TITLE,
      () => deleteUser(userId)
    );
  };

  return (
    <IconButton aria-label='remove-user' onClick={onDeleteHandler}>
      <RemoveCircleOutline />
    </IconButton>
  );
};

export default DeleteUser;
