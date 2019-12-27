import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { UserRole, QueryNewbieArgs } from 'buddy-app-schema';
import AuthContext, { AuthContextData } from 'contexts/AuthContext';
import DialogContext, { DialogContextData } from 'contexts/DialogContext';
import SnackbarContext, { SnackbarContextData } from 'contexts/SnackbarContext';
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
import { TaskOptionsProps } from './types';

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

const TaskOptions: React.FC<TaskOptionsProps> = ({
  id: taskId,
  taskOptionHandlers = {},
}) => {
  const { deleteTask } = taskOptionHandlers;
  const {
    data: { role },
  } = useContext<AuthContextData>(AuthContext);
  const { showDialog, hideDialog } = useContext<DialogContextData>(DialogContext);
  const { showSnackbar } = useContext<SnackbarContextData>(SnackbarContext);
  const { newbieId } = useParams<QueryNewbieArgs>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpened = Boolean(anchorEl);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(e.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const handleDelete = () =>
    showDialog(
      DICTIONARY.DELETE_DIALOG.MESSAGE,
      DICTIONARY.DELETE_DIALOG.TITLE,
      async () => {
        handleClose();
        hideDialog();

        try {
          deleteTask && (await deleteTask({ variables: { taskId, newbieId } }));
          showSnackbar(DICTIONARY.DELETE_SNACKBAR.SUCCESS);
        } catch (err) {
          showSnackbar(DICTIONARY.DELETE_SNACKBAR.ERROR);
        }
      }
    );

  const options = [
    {
      text: DICTIONARY.OPTIONS.EDIT,
      Icon: EditIcon,
      onClick: handleClose,
      access: {
        [UserRole.Newbie]: false,
        [UserRole.Buddy]: true,
      },
    },
    {
      text: DICTIONARY.OPTIONS.COPY_LINK,
      Icon: FileCopyIcon,
      onClick: handleClose,
      access: {
        [UserRole.Newbie]: true,
        [UserRole.Buddy]: true,
      },
    },
    {
      text: DICTIONARY.OPTIONS.DELETE,
      Icon: DeleteIcon,
      onClick: handleDelete,
      access: {
        [UserRole.Newbie]: false,
        [UserRole.Buddy]: true,
      },
    },
  ];

  return (
    <>
      <IconButton
        aria-label='more'
        aria-controls='task-options'
        aria-haspopup='true'
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
        keepMounted
        open={isOpened}
        onClose={handleClose}>
        {options.map(
          ({ Icon, text, onClick, access }) =>
            access[role] && (
              <MenuItem key={text} onClick={onClick} dense>
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
