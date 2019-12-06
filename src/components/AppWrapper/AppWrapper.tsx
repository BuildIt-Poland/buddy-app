import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import UserMenu from 'components/UserMenu';
import Header from 'components/Header';

const drawerWidth = '28rem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      // maxWidth: theme.breakpoints.values.lg,
    },
    drawer: {
      // [theme.breakpoints.up('sm')]: {
      //   width: drawerWidth,
      //   flexShrink: 0,
      // },
    },
    drawerPaper: {
      width: drawerWidth,
      // backgroundColor: 'white',
    },
    content: {
      flexGrow: 1,
      width: '100%',
    },
    drawerHeader: theme.mixins.toolbar,
  })
);

const ResponsiveDrawer: React.FC = props => {
  const { children } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  return (
    <div className={classes.root}>
      <Header
        type={'menu'}
        position={'fixed'}
        onButtonClick={handleDrawerToggle}></Header>
      <nav className={classes.drawer}>
        <SwipeableDrawer
          variant='temporary'
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onOpen={handleDrawerToggle}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true,
          }}>
          <UserMenu onCloseClick={handleDrawerToggle} />
        </SwipeableDrawer>
        {/* <Hidden smUp implementation='js'>
          <SwipeableDrawer
            variant='temporary'
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onOpen={handleDrawerToggle}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}>
            <UserMenu onCloseClick={handleDrawerToggle} />
          </SwipeableDrawer>
        </Hidden> */}
        {/* <Hidden xsDown implementation='js'>
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant={'permanent'}
            open>
            <div className={classes.drawerHeader} />
            <UserMenu />
          </Drawer>
        </Hidden> */}
      </nav>
      <main className={classes.content}>
        <div className={classes.drawerHeader} />
        {children}
      </main>
    </div>
  );
};

export default ResponsiveDrawer;
