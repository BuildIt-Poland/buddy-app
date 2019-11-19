import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { AppBar, Theme } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { NavBarButton, NavBarProps } from './types';

const useStyles = makeStyles<Theme>(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  AppBar: {
    backgroundColor: theme.palette.background.default,
    boxShadow: 'none',
  },
}));

const NavBar: React.FC<NavBarProps> = props => {
  const classes = useStyles();

  const button: NavBarButton = {
    menu: () => <MenuIcon />,
    back: () => <ArrowBackIcon />,
  };
  const { type, onClick } = props;

  return (
    <AppBar className={classes.AppBar} color={'inherit'} position='fixed'>
      <Toolbar>
        <IconButton
          edge='start'
          className={classes.menuButton}
          color='inherit'
          onClick={onClick}>
          {button[type]()}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
