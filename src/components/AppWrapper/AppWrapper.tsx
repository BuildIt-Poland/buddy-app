import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import LoginPage from '../LoginPage';

const useStyles = makeStyles(theme => ({
  container: {
    minWidth: theme.breakpoints.values['xs'],
  },
}));

const Root: React.FC = () => {
  const classes = useStyles();

  return (
    <Container
      data-testid={'root'}
      className={classes.container}
      component='main'
      maxWidth='md'>
      <LoginPage />
    </Container>
  );
};

export default Root;
