import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';
import clsx from 'clsx';
import { PageContainerProps } from './types';

const useStyles = makeStyles(theme => ({
  container: {
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(2),
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(3),
    },
  },
  hideLoading: {
    visibility: 'hidden',
  },
}));

const PageContainer: React.FC<PageContainerProps> = props => {
  const classes = useStyles();
  const { loading = false, children } = props;

  return (
    <>
      <LinearProgress
        className={clsx({ [classes.hideLoading]: !loading })}
        variant={'indeterminate'}
        color={'primary'}
      />
      <Container className={classes.container} maxWidth={'md'} {...props}>
        {children}
      </Container>
    </>
  );
};

export default PageContainer;
