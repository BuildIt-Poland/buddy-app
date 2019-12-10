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
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  withoutShadow: {
    boxShadow: 'none',
  },
  paperAppBarBackground: {
    backgroundColor: theme.palette.background.paper,
  },
  defaultAppBarBackground: {
    backgroundColor: theme.palette.background.default,
  },
}));

const Header: React.FC<HeaderProps> = ({
  type,
  color = 'default',
  children,
  onButtonClick,
}) => {
  const classes = useStyles();
  const scrollTrigger = useScrollTrigger({ threshold: 10 });

  const button: NavBarButton = {
    menu: () => <MenuIcon />,
    back: () => <ArrowBackIcon />,
  };

  const colorClassNames = {
    default: classes.defaultAppBarBackground,
    paper: classes.neutralAppBarBackground,
  };

  return (
    <AppBar
      component={'header'}
      className={clsx(
        classes.appBar,
        {
          [classes.withoutShadow]: !scrollTrigger,
        },
        colorClassNames[color]
      )}
      position={'sticky'}
      color={'inherit'}>
      <Toolbar>
        <IconButton
          edge='start'
          className={classes.menuButton}
          color='inherit'
          onClick={onButtonClick}>
          {button[type]()}
        </IconButton>
      </Toolbar>
      {children}
    </AppBar>
  );
};

export default Header;
