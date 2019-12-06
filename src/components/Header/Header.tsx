import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { AppBar, Theme } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import clsx from 'clsx';
import { NavBarButton, HeaderProps } from './types';

const useStyles = makeStyles<Theme>(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
    // [theme.breakpoints.up('sm')]: {
    //   display: 'none',
    // },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: 'white',
  },
  withoutShadow: {
    boxShadow: 'none',
  },
}));

const Header: React.FC<HeaderProps> = ({
  type,
  onClick,
  onButtonClick,
  ...props
}) => {
  const classes = useStyles();
  const scrollTrigger = useScrollTrigger({ threshold: 10 });

  const button: NavBarButton = {
    menu: () => <MenuIcon />,
    back: () => <ArrowBackIcon />,
  };

  return (
    <AppBar
      className={clsx(classes.appBar, {
        [classes.withoutShadow]: !scrollTrigger,
      })}
      color={'inherit'}
      {...props}>
      <Toolbar>
        <IconButton
          edge='start'
          className={classes.menuButton}
          color='inherit'
          onClick={onButtonClick}>
          {button[type]()}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
