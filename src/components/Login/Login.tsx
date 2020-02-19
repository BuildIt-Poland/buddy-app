import React, { useEffect, useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import useForm from 'react-hook-form';
import { ReactComponent as SpaceManLogo } from 'assets/svg/spaceman.svg';
import PageContainer from 'components/PageContainer/PageContainer';
import { useDialog } from 'contexts/DialogContext';
import { useAuth, login } from 'contexts/AuthContext';
import RoundedButton from '../RoundedButton';
import DICTIONARY from './dictionary';
import { FormData } from './types';

const useStyles = makeStyles(theme => ({
  spaceMan: {
    maxHeight: '25rem',
    minHeight: '10rem',
    marginTop: theme.spacing(3),
  },
  form: {
    width: '100%',
  },
  submit: {
    margin: theme.spacing(3, 0),
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

const Login: React.FC = () => {
  const classes = useStyles();
  const { register, errors, handleSubmit } = useForm<FormData>();
  const [{ loading, error }, dispatch] = useAuth();
  const {
    current: { showDialog },
  } = useRef(useDialog());

  const onSubmit = ({ email, password }: FormData) =>
    login(dispatch, email, password);

  useEffect(() => {
    if (error) {
      if (error.networkError) {
        showDialog(DICTIONARY.ERRORS.NO_NETWORK);
      } else {
        showDialog(DICTIONARY.ERRORS.NO_USER_FOUND);
      }
    }
  }, [error, showDialog]);

  return (
    <PageContainer
      className={classes.container}
      backGroundShape
      data-testid='login-page'
      maxWidth='md'>
      <Typography
        className={classes.title}
        component='h1'
        variant='h1'
        align='center'>
        {DICTIONARY.TITLE}
      </Typography>
      <SpaceManLogo className={classes.spaceMan} />
      <form
        className={classes.form}
        data-testid='form'
        noValidate
        onSubmit={handleSubmit(onSubmit)}>
        <TextField
          inputProps={{ 'data-testid': 'email' }}
          inputRef={register({
            required: DICTIONARY.EMAIL.REQUIRED,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: DICTIONARY.EMAIL.INVALID,
            },
          })}
          margin={'dense'}
          fullWidth
          label={DICTIONARY.EMAIL.LABEL}
          name='email'
          autoComplete='em
          ail'
          autoFocus
          error={!!errors.email}
          helperText={(errors.email && errors.email.message) || ' '}
        />
        <TextField
          inputProps={{ 'data-testid': 'password' }}
          inputRef={register({
            required: DICTIONARY.PASSWORD.REQUIRED,
          })}
          margin={'dense'}
          fullWidth
          name='password'
          label={DICTIONARY.PASSWORD.LABEL}
          type='password'
          autoComplete='current-password'
          error={!!errors.password}
          helperText={(errors.password && errors.password.message) || ' '}
        />
        <RoundedButton
          data-testid='submit-button'
          type='submit'
          fullWidth
          variant='contained'
          color='primary'
          disabled={loading}
          className={classes.submit}>
          {loading ? (
            <CircularProgress
              data-testid='login-progress'
              variant={'indeterminate'}
              size={32}
            />
          ) : (
            DICTIONARY.SIGN_IN
          )}
        </RoundedButton>
        <Grid container justify='flex-end'>
          <Button disabled>{DICTIONARY.FORGOT_PASSWORD}</Button>
        </Grid>
      </form>
    </PageContainer>
  );
};

export default Login;
