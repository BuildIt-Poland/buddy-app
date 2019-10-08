import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    minWidth: theme.breakpoints.values['xs'],
  },
}));

const Root: React.FunctionComponent = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container} component='main' maxWidth='md'>
      Buddy App
    </Container>
  );
};

export default Root;
