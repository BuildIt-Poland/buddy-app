import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';
import { fade } from '@material-ui/core/styles/colorManipulator';
import clsx from 'clsx';
import { Theme } from '@material-ui/core';
import {
  NavBarButton,
  HeaderProps,
  MenuColors,
  MenuShapes,
  MenuTypes,
} from './types';

const LOADER_SIZE = 0.25;

const SHADOW_SIZE = 0.5;

const useStyles = makeStyles<Theme>(theme => ({
  toolBar: {
    justifyContent: 'space-between',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  withoutShadow: {
    boxShadow: 'none',
  },
  defaultBackground: {
    background: fade(theme.palette.background.default, 0.95),
  },
  paperBackground: {
    background: `linear-gradient(${theme.palette.background.default}, ${theme.palette.background.paper})`,
  },
  roundedBackground: {
    width: '110%',
    padding: '0 5%',
    marginLeft: '-5%',
  },
  roundedShape: {
    borderRadius: '0 0 100% 100%',
  },
  loaderShadow: {
    boxShadow: theme.shadows[2],
  },
  loaderLayer: {
    width: '110%',
    height: `calc(100% - ${theme.spacing(SHADOW_SIZE)})`,
    left: '-5%',
    top: 0,
    position: 'absolute',
    zIndex: theme.zIndex.backgroundShape,
  },
  hideLoader: {
    visibility: 'hidden',
  },
  appBarContainer: {
    overflow: 'hidden',
    width: '100%',
    position: 'sticky',
    top: 0,
    right: 0,
    left: 'auto',
    zIndex: theme.zIndex.appBar,
    paddingBottom: theme.spacing(LOADER_SIZE + SHADOW_SIZE),
    minHeight: theme.mixins.toolbar.minHeight,
  },
}));

const Header: React.FC<HeaderProps> = ({
  type,
  color = MenuColors.DEFAULT,
  shape = MenuShapes.DEFAULT,
  navItems,
  children,
  loading,
  onButtonClick,
}) => {
  const {
    toolBar,
    menuButton,
    withoutShadow,
    defaultBackground,
    paperBackground,
    loaderShadow,
    loaderLayer,
    hideLoader,
    roundedShape,
    roundedBackground,
    appBarContainer,
  } = useStyles();

  const scrollTrigger = useScrollTrigger({ disableHysteresis: true, threshold: 10 });
  const isRoundedShape = shape === MenuShapes.ROUNDED;

  const button: NavBarButton = {
    [MenuTypes.MENU]: () => <MenuIcon aria-label='Open left menu' />,
    [MenuTypes.BACK]: () => <ArrowBackIcon aria-label='Return previous page' />,
  };

  const colorClassNames = {
    [MenuColors.DEFAULT]: defaultBackground,
    [MenuColors.PAPER]: paperBackground,
  };

  const shapeClassNames = {
    [MenuShapes.DEFAULT]: '',
    [MenuShapes.ROUNDED]: [roundedBackground, roundedShape],
  };

  return (
    <Box component='header' className={appBarContainer}>
      <AppBar
        className={clsx(colorClassNames[color], shapeClassNames[shape], {
          [withoutShadow]: loading || !scrollTrigger,
        })}
        position='static'
        color='inherit'
        component='div'>
        <Toolbar component='nav' className={toolBar}>
          <IconButton
            edge='start'
            className={menuButton}
            color='inherit'
            onClick={onButtonClick}>
            {button[type]()}
          </IconButton>
          {navItems}
        </Toolbar>
        {children}
      </AppBar>
      <LinearProgress
        variant={'indeterminate'}
        className={clsx(loaderShadow, {
          [hideLoader]: !loading,
          [roundedShape]: isRoundedShape,
          [loaderLayer]: children,
        })}
      />
    </Box>
  );
};

export default Header;
