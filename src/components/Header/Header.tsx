import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { AppBar, Theme } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import LinearProgress from '@material-ui/core/LinearProgress';
import { fade } from '@material-ui/core/styles/colorManipulator';
import clsx from 'clsx';
import {
  NavBarButton,
  HeaderProps,
  MenuColors,
  MenuShapes,
  MenuTypes,
} from './types';

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
    background: `linear-gradient(white , ${theme.palette.background.paper})`,
  },
  defaultAppBarBackground: {
    background: fade(theme.palette.background.default, 0.95),
  },
  roundedShapeBackground: {
    borderRadius: '0 0 100% 100%',
    width: '110%',
    padding: '0 5%',
    marginLeft: '-5%',
  },
  hideLoading: {
    visibility: 'hidden',
  },
  roundedShapeLoader: {
    width: '110%',
    height: '101%',
    padding: '0 5%',
    marginLeft: '-5%',
    borderRadius: '0 0 100% 100%',
    position: 'absolute',
    zIndex: -1,
  },
  roundedShape: {
    width: '110%',
    height: '100%',
    padding: '0 5%',
    marginLeft: '-5%',
    borderRadius: '0 0 100% 100%',
    position: 'absolute',
    zIndex: -1,
    background: `linear-gradient(white , ${theme.palette.background.paper})`,
  },
}));

const Header: React.FC<HeaderProps> = ({
  type,
  color = MenuColors.DEFAULT,
  shape = MenuShapes.DEFAULT,
  children,
  loading,
  onButtonClick,
}) => {
  const classes = useStyles();
  const scrollTrigger = useScrollTrigger({ disableHysteresis: true, threshold: 10 });

  const button: NavBarButton = {
    [MenuTypes.MENU]: () => <MenuIcon />,
    [MenuTypes.BACK]: () => <ArrowBackIcon />,
  };

  const colorClassNames = {
    [MenuColors.DEFAULT]: classes.defaultAppBarBackground,
    [MenuColors.PAPER]: classes.neutralAppBarBackground,
  };

  const shapeClassNames = {
    [MenuShapes.DEFAULT]: '',
    [MenuShapes.ROUNDED]: classes.roundedShapeBackground,
  };

  return (
    <AppBar
      component={'header'}
      className={clsx(
        classes.appBar,
        colorClassNames[color],
        shapeClassNames[shape],
        {
          [classes.withoutShadow]: !scrollTrigger,
        }
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
      <LinearProgress
        variant={'indeterminate'}
        className={clsx({
          [classes.hideLoading]: !loading,
          [classes.roundedShapeLoader]: shape === MenuShapes.ROUNDED,
        })}
      />
      <div className={classes.roundedShape} />
    </AppBar>
  );
};

export default Header;
