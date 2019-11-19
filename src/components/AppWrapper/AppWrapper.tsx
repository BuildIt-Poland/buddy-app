import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(7),
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(8),
    },
  },
}));

const AppWrapper: React.FC = ({ children, ...props }) => {
  const classes = useStyles();

  return (
    <Container
      component={'main'}
      maxWidth={'md'}
      className={classes.root}
      {...props}>
      {children}
    </Container>
  );
};

export default AppWrapper;
