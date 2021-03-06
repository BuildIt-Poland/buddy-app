import React from 'react';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { useMenu } from 'contexts/MenuContext';
import UserMenu from 'components/UserMenu';
import { convertDirectionToAnchor } from 'utils';

const drawerWidth = '28rem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      height: '100%',
    },
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
    },
    drawerHeader: theme.mixins.toolbar,
  })
);

const AppWrapper: React.FC = props => {
  const { children } = props;
  const classes = useStyles();
  const theme = useTheme();
  const { isOpen, toggleMenu } = useMenu();

  return (
    <div className={classes.root} data-testid='app-wrapper'>
      <nav>
        <SwipeableDrawer
          variant='temporary'
          anchor={convertDirectionToAnchor(theme.direction)}
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
