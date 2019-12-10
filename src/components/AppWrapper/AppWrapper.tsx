import React from 'react';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MenuContext from 'contexts/MenuContext';
import UserMenu from 'components/UserMenu';

const drawerWidth = '28rem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      width: '100%',
    },
    drawerHeader: theme.mixins.toolbar,
  })
);

const AppWrapper: React.FC = props => {
  const { children } = props;
  const classes = useStyles();
  const theme = useTheme();
  const { isOpen, toggleMenu } = React.useContext(MenuContext);

  return (
    <div className={classes.root}>
      <nav>
        <SwipeableDrawer
          variant='temporary'
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={isOpen}
          onOpen={toggleMenu}
          onClose={toggleMenu}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true,
          }}>
          <UserMenu onCloseClick={toggleMenu} />
        </SwipeableDrawer>
      </nav>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

export default AppWrapper;
