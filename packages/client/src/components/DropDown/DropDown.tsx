import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { useAuth } from 'contexts/AuthContext';
import Fade from '@material-ui/core/Fade';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { DropDownProps } from './types';

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

const DropDown = (props: DropDownProps) => {
  const { renderOptions, renderAnchor, ...restProps } = props;
  const [
    {
      data: { role },
    },
  ] = useAuth();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const isOpened = Boolean(anchorEl);

  const showOptions = (e: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(e.currentTarget);
  const hideOptions = () => setAnchorEl(null);

  return (
    <>
      {renderAnchor(showOptions)}
      <StyledMenu
        {...restProps}
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        TransitionComponent={Fade}
        keepMounted={false}
        open={isOpened}
        onClose={hideOptions}>
        {renderOptions(hideOptions).map(
          ({ Icon, text, onClick, access, disabled }) =>
            access[role] && (
              <MenuItem
                key={text}
                data-testid={text}
                onClick={onClick}
                dense
                disabled={disabled}>
                {Icon && (
                  <StyledListItemIcon>
                    <Icon fontSize='small' />
                  </StyledListItemIcon>
                )}
                <ListItemText secondary={<strong>{text}</strong>} />
              </MenuItem>
            )
        )}
      </StyledMenu>
    </>
  );
};

export default DropDown;
