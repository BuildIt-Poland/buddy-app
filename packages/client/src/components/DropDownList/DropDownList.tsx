import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { useAuth } from 'contexts/AuthContext';
import Fade from '@material-ui/core/Fade';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { DropDownListProps } from './types';

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

const DropDownList = (props: DropDownListProps) => {
  const { id, options, open, anchorEl, anchorOrigin, onClose } = props;
  const [
    {
      data: { role },
    },
  ] = useAuth();

  return (
    <StyledMenu
      id={id}
      anchorEl={anchorEl}
      getContentAnchorEl={null}
      anchorOrigin={anchorOrigin}
      TransitionComponent={Fade}
      keepMounted={false}
      open={open}
      onClose={onClose}>
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
  );
};

export default DropDownList;
