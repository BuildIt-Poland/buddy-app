import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { AppBar, createStyles, Theme } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { NavBarButton, NavBarProps } from './types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

const NavBar: React.FC<NavBarProps> = props => {
  const classes = useStyles();

  const button: NavBarButton = {
    menu: () => <MenuIcon />,
    back: () => <ArrowBackIcon />,
  };
  const { type, onClick } = props;

  return (
    <AppBar position='fixed'>
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
