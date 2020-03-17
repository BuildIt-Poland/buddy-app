import React, { useState } from 'react';
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
import DropDownList from 'components/DropDownList';
import { OptionItem } from 'components/DropDownList/types';
import { TaskOptionsProps } from './types';
import DICTIONARY from './dictionary';

const TaskOptions: React.FC<TaskOptionsProps> = ({ id: taskId }) => {
  const { newbieId } = useParams<QueryNewbieArgs>();
  const { showDialog } = useDialog();
  const { showSnackbar } = useSnackBar();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpened = Boolean(anchorEl);

  const [deleteTask] = useTaskDelete(newbieId, {
    onCompleted: () => showSnackbar(DICTIONARY.DELETE_SNACKBAR.SUCCESS),
    onError: () => showSnackbar(DICTIONARY.DELETE_SNACKBAR.ERROR),
  });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(e.currentTarget);

  const onCloseTaskOptions = () => setAnchorEl(null);

  const handleDelete = () => {
    onCloseTaskOptions();

    showDialog(
      DICTIONARY.DELETE_DIALOG.MESSAGE,
      DICTIONARY.DELETE_DIALOG.TITLE,
      () => deleteTask(taskId)
    );
  };

  const options: OptionItem[] = [
    {
      text: DICTIONARY.OPTIONS.EDIT,
      Icon: EditIcon,
      onClick: onCloseTaskOptions,
      access: {
        [UserRole.Newbie]: false,
        [UserRole.Buddy]: true,
      },
      disabled: true,
    },
    {
      text: DICTIONARY.OPTIONS.COPY_LINK,
      Icon: FileCopyIcon,
      onClick: onCloseTaskOptions,
      access: {
        [UserRole.Newbie]: true,
        [UserRole.Buddy]: true,
      },
      disabled: true,
    },
    {
      text: DICTIONARY.OPTIONS.DELETE,
      Icon: DeleteIcon,
      onClick: handleDelete,
      access: {
        [UserRole.Newbie]: false,
        [UserRole.Buddy]: true,
      },
      disabled: false,
    },
  ];

  return (
    <>
      <IconButton
        aria-label='more'
        aria-controls='task-options'
        aria-haspopup='true'
        data-testid='task-options-btn'
        onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <DropDownList
        id='task-options'
        options={options}
        open={isOpened}
        onClose={onCloseTaskOptions}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
      />
    </>
  );
};

export default TaskOptions;
