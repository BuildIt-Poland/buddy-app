import React from 'react';
import Typography from '@material-ui/core/Typography';
import { ReactComponent as R2d2 } from 'assets/svg/r2d2.svg';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import BackGroundShape from 'components/BackgroundShape';
import Container from '@material-ui/core/Container';
import { ErrorPageProps } from './types';
import ERROR_PAGE_DICTIONARY from './dictionary';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    display: 'flex',
  },
  r2d2: {
    animation: `$float 3s ${theme.transitions.easing.easeInOut} infinite`,
  },
  '@keyframes float': {
    '0%': {
      transform: 'translateY(1rem)',
    },
    '50%': {
      transform: 'translateY(-1rem)',
    },
    '100%': {
      transform: 'translateY(1rem)',
    },
  },
}));

const ErrorPage: React.FC<ErrorPageProps> = ({ title, message, ...props }) => {
  const classes = useStyles();

  return (
    <Container
      component={'main'}
      className={classes.root}
      maxWidth={'md'}
      {...props}>
      <Grid
        spacing={1}
        container
        direction='column'
        justify='center'
        alignItems='center'>
        <Grid item>
          <Typography component='h1' variant='h1' align={'center'}>
            {title}
          </Typography>
        </Grid>
        <Grid item>
          <Typography component={'p'} align={'center'}>
            {message}
          </Typography>
        </Grid>
        <Grid item>
          <R2d2 className={classes.r2d2} />
        </Grid>
        <Grid item>
          <Button href={'/'} variant={'outlined'} color='primary'>
            {ERROR_PAGE_DICTIONARY.GO_HOMEPAGE}
          </Button>
        </Grid>
        <BackGroundShape />
      </Grid>
    </Container>
  );
};

export default ErrorPage;
