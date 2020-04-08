import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { ReactComponent as SpaceManLogo } from 'assets/svg/spaceman.svg';
import PageContainer from 'atoms/PageContainer';
import { AuthContainerProps } from './types';

const useStyles = makeStyles(theme => ({
  spaceMan: {
    maxHeight: '25rem',
    minHeight: '10rem',
    marginTop: theme.spacing(3),
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  title: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '6.5rem',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '5rem',
    },
  },
}));

const AuthContainer: React.FC<AuthContainerProps> = ({ title, children }) => {
  const classes = useStyles();

  return (
    <PageContainer className={classes.container} backGroundShape maxWidth='md'>
      <Typography
        className={classes.title}
        component='h1'
        variant='h1'
        align='center'>
        {title}
      </Typography>
      <SpaceManLogo className={classes.spaceMan} />
      {children}
    </PageContainer>
  );
};

export default AuthContainer;
