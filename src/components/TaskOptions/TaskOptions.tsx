import React, { useState, useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { UserRole } from 'buddy-app-schema';
import AuthContext, { AuthContextData } from 'contexts/AuthContext';
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

const TaskOptions: React.FC = () => {
  const {
    data: { role },
  } = useContext<AuthContextData>(AuthContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpened = Boolean(anchorEl);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(e.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const options = [
    {
      text: DICTIONARY.EDIT,
      Icon: EditIcon,
      onClick: handleClose,
      access: {
        [UserRole.Newbie]: false,
        [UserRole.Buddy]: true,
      },
    },
    {
      text: DICTIONARY.COPY_LINK,
      Icon: FileCopyIcon,
      onClick: handleClose,
      access: {
        [UserRole.Newbie]: true,
        [UserRole.Buddy]: true,
      },
    },
    {
      text: DICTIONARY.DELETE,
      Icon: DeleteIcon,
      onClick: handleClose,
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
              <MenuItem key={text} onClick={onClick}>
                <StyledListItemIcon>
                  <Icon fontSize='small' />
                </StyledListItemIcon>
                <ListItemText primary={text} />
              </MenuItem>
            )
        )}
      </StyledMenu>
    </>
  );
};

export default TaskOptions;
