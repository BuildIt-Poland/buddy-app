import React from 'react';
import { useParams } from 'react-router-dom';
import { UserRole, QueryNewbieArgs } from '@buddy-app/schema';
import { useDialog } from 'contexts/DialogContext';
import { useSnackBar } from 'contexts/SnackbarContext';
import useTaskDelete from 'hooks/useTaskDelete';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import DeleteIcon from '@material-ui/icons/Delete';
import DropDown, { ShowOptions, HideOptions } from 'components/DropDown';
import { TaskOptionsProps } from './types';
import DICTIONARY from './dictionary';
/* istanbul ignore file */
const TaskOptions: React.FC<TaskOptionsProps> = ({ id: taskId }) => {
  const { newbieId } = useParams<QueryNewbieArgs>();
  const { showDialog } = useDialog();
  const { showSnackbar } = useSnackBar();

  const [deleteTask] = useTaskDelete(newbieId, {
    onCompleted: () => showSnackbar(DICTIONARY.DELETE_SNACKBAR.SUCCESS),
    onError: () => showSnackbar(DICTIONARY.DELETE_SNACKBAR.ERROR),
  });

  const renderOptions = (hideOptions: HideOptions) => [
    {
      text: DICTIONARY.OPTIONS.EDIT,
      Icon: EditIcon,
      onClick: hideOptions,
      access: {
        [UserRole.Buddy]: true,
        [UserRole.Talent]: true,
      },
      disabled: true,
    },
    {
      text: DICTIONARY.OPTIONS.COPY_LINK,
      Icon: FileCopyIcon,
      onClick: hideOptions,
      access: {
        [UserRole.Newbie]: true,
        [UserRole.Buddy]: true,
        [UserRole.Talent]: true,
      },
      disabled: true,
    },
    {
      text: DICTIONARY.OPTIONS.DELETE,
      Icon: DeleteIcon,
      onClick: () => {
        hideOptions();
        showDialog(
          DICTIONARY.DELETE_DIALOG.MESSAGE,
          DICTIONARY.DELETE_DIALOG.TITLE,
          () => deleteTask(taskId)
        );
      },
      access: {
        [UserRole.Buddy]: true,
        [UserRole.Talent]: true,
      },
    },
  ];

  const renderAnchor = (showOptions: ShowOptions) => (
    <IconButton
      aria-label='more'
      aria-controls='task-options'
      aria-haspopup='true'
      data-testid='task-options-btn'
      onClick={showOptions}>
      <MoreVertIcon />
    </IconButton>
  );

  return (
    <DropDown
      id='task-options'
      renderOptions={renderOptions}
      renderAnchor={renderAnchor}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'center',
      }}
    />
  );
};

export default TaskOptions;
