import React from 'react';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MenuContext from 'contexts/MenuContext';
import UserMenu from 'components/UserMenu';
import { convertDirectionToAnchor } from 'utils';

const drawerWidth = '28rem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      minHeight: '100vh',
    },
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
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
