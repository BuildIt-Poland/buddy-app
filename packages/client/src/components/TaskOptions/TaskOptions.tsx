import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { UserRole, QueryNewbieArgs } from '@buddy-app/schema';
import { useAuth } from 'contexts/AuthContext';
import { useDialog } from 'contexts/DialogContext';
import { useSnackBar } from 'contexts/SnackbarContext';
import useTaskDelete from 'hooks/useTaskDelete';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Fade from '@material-ui/core/Fade';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EditIcon from '@material-ui/icons/Edit';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import DeleteIcon from '@material-ui/icons/Delete';
import DICTIONARY from './dictionary';
import { TaskOptionsProps, TaskOptionItem } from './types';

const StyledMenu = withStyles(theme => ({
  paper: {
    backgroundColor: theme.palette.background.default,
    boxShadow: theme.shadows[2],
  },
}))(Menu);

const StyledListItemIcon = withStyles(theme => ({
  root: {
    minWidth: 'auto',
    paddingRight: theme.spacing(1.5),
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
}))(ListItemIcon);

const TaskOptions: React.FC<TaskOptionsProps> = ({ id: taskId }) => {
  const [
    {
      data: { role },
    },
  ] = useAuth();
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

  const options: [TaskOptionItem, TaskOptionItem, TaskOptionItem] = [
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
      <StyledMenu
        id='task-options'
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        TransitionComponent={Fade}
        keepMounted={false}
        open={isOpened}
        onClose={onCloseTaskOptions}>
        {options.map(
          ({ Icon, text, onClick, access, disabled }) =>
            access[role] && (
              <MenuItem
                key={text}
                data-testid={text}
                onClick={onClick}
                dense
                disabled={disabled}>
                <StyledListItemIcon>
                  <Icon fontSize='small' />
                </StyledListItemIcon>
                <ListItemText secondary={<strong>{text}</strong>} />
              </MenuItem>
            )
        )}
      </StyledMenu>
    </>
  );
};

export default TaskOptions;
