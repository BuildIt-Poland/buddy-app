import React, { useState } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { AppBar, Theme } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import SlideMenu from 'components/SlideMenu';
import { NavBarButton, NavBarProps } from './types';

const useStyles = makeStyles<Theme>(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  AppBar: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },
}));

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
      <AppBar className={classes.AppBar} color={'inherit'} position='fixed'>
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
