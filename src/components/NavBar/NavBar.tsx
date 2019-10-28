import React, { useState } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { AppBar, createStyles, Theme } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import SlideMenu from '../SlideMenu/SlideMenu';
import { NavBarButton, NavBarProps } from './types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
    },
  })
);

const NavBar: React.FC<NavBarProps> = props => {
  const classes = useStyles();
  const [isMenuVisible, updateMenuVisibility] = useState(true);

  const button: NavBarButton = {
    menu: () => <MenuIcon />,
    back: () => <ArrowBackIcon />,
  };
  const { type, onClick } = props;

  const onPressDefaultAction = () => {
    updateMenuVisibility(!isMenuVisible);
  };

  const handleOnClose = () => {
    updateMenuVisibility(false);
  };

  return (
    <>
      <AppBar position='fixed'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            onClick={onClick || onPressDefaultAction}>
            {button[type]()}
          </IconButton>
        </Toolbar>
      </AppBar>
      <SlideMenu isMenuVisible={isMenuVisible} onClose={handleOnClose} />
    </>
  );
};

export default NavBar;
