import React from 'react';
import { AppBar, createStyles, Theme } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

const NavBar: React.FC = () => {
  const classes = useStyles();

  return (
    <AppBar position='fixed'>
      <Toolbar>
        <IconButton
          edge='start'
          className={classes.menuButton}
          color='inherit'
          aria-label='menu'>
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

const NewbieSelect: React.FC = () => {
  return (
    <>
      <NavBar />
      <Typography component='h2' variant='h2'>
        Your New Joiners
      </Typography>
    </>
  );
};

export default NewbieSelect;
