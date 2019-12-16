import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { AppBar, Theme } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';
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
  defaultAppBarBackground: {
    background: fade(theme.palette.background.default, 0.95),
  },
  paperAppBarBackground: {
    background: `linear-gradient(${theme.palette.background.default}, ${theme.palette.background.paper})`,
  },
  roundedAppBarBackground: {
    width: '110%',
    padding: '0 5%',
    marginLeft: '-5%',
  },
  roundedShape: {
    borderRadius: '0 0 100% 100%',
  },
  backgroundLayer: {
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,
    position: 'absolute',
    zIndex: theme.zIndex.backgroundShape,
  },
  loaderShadow: {
    boxShadow: theme.shadows[2],
  },
  increasedLoader: {
    height: '101%',
  },
  hideLoader: {
    visibility: 'hidden',
  },
  appBarContainer: {
    width: '100%',
    position: 'sticky',
    top: 0,
    right: 0,
    left: 'auto',
    zIndex: theme.zIndex.appBar,
    paddingBottom: '1%',
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
  const {
    menuButton,
    appBar,
    withoutShadow,
    defaultAppBarBackground,
    paperAppBarBackground,
    loaderShadow,
    hideLoader,
    backgroundLayer,
    roundedShape,
    roundedAppBarBackground,
    increasedLoader,
    appBarContainer,
  } = useStyles();

  const scrollTrigger = useScrollTrigger({ disableHysteresis: true, threshold: 10 });
  const isRoundedShape = shape === MenuShapes.ROUNDED;

  const button: NavBarButton = {
    [MenuTypes.MENU]: () => <MenuIcon />,
    [MenuTypes.BACK]: () => <ArrowBackIcon />,
  };

  const colorClassNames = {
    [MenuColors.DEFAULT]: defaultAppBarBackground,
    [MenuColors.PAPER]: paperAppBarBackground,
  };

  const shapeClassNames = {
    [MenuShapes.DEFAULT]: '',
    [MenuShapes.ROUNDED]: [roundedAppBarBackground, roundedShape],
  };

  const HeaderBar = () => (
    <AppBar
      component={'header'}
      className={clsx(appBar, colorClassNames[color], shapeClassNames[shape], {
        [withoutShadow]: loading || !scrollTrigger,
      })}
      position={'sticky'}
      color={'inherit'}>
      <Toolbar>
        <IconButton
          edge='start'
          className={menuButton}
          color='inherit'
          onClick={onButtonClick}>
          {button[type]()}
        </IconButton>
      </Toolbar>
      {children}
      <LinearProgress
        variant={'indeterminate'}
        className={clsx(
          loaderShadow,
          children && [increasedLoader, backgroundLayer],
          { [hideLoader]: !loading, [roundedShape]: isRoundedShape }
        )}
      />
      <Box
        className={clsx(paperAppBarBackground, {
          [backgroundLayer]: children,
          [roundedShape]: isRoundedShape,
        })}
      />
    </AppBar>
  );

  return children ? (
    <Box className={appBarContainer}>
      <HeaderBar />
    </Box>
  ) : (
    <HeaderBar />
  );
};

export default Header;
