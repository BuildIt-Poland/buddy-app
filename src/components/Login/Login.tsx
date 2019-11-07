import React, { useState, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import useForm from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { ReactComponent as SpaceManLogo } from 'assets/svg/spaceman.svg';
import { AuthContext, AuthContextData } from 'context/AuthStore';
import { ROUTES } from 'shared/routes';
import RoundedButton from '../RoundedButton';
import AlertDialog from '../AlertDialog';
import BackgroundShape from '../BackgroundShape/';
import DICTIONARY from './login.dictionary';
import { ErrorDialog, FormData } from './types';

const useStyles = makeStyles(theme => ({
  title: {
    marginTop: theme.spacing(8),
  },
  spaceMan: {
    display: 'block',
    margin: '0 auto',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const [errorDialog, setErrorDialog] = useState<ErrorDialog>({
    isOpen: false,
    message: '',
  });
  const { register, errors, handleSubmit } = useForm<FormData>();
  const { login, loading } = useContext<AuthContextData>(AuthContext);

  const onSubmit = async ({ email, password }: FormData) => {
    setErrorDialog({
      isOpen: false,
      message: '',
    });
    try {
      await login(email, password);
      history.push(ROUTES.BUDDY_SELECT_NEWBIE);
    } catch (error) {
      if (error.networkError) {
        setErrorDialog({
          isOpen: true,
          message: DICTIONARY.ERRORS.NO_NETWORK,
        });
      } else {
        setErrorDialog({
          isOpen: true,
          message: DICTIONARY.ERRORS.NO_USER_FOUND,
        });
      }
    }
  };
  return (
    <>
      <Typography
        className={classes.title}
        component='h1'
        variant='h1'
        align={'center'}>
        {DICTIONARY.TITLE}
      </Typography>
      <SpaceManLogo className={classes.spaceMan} />
      <form data-testid='form' noValidate onSubmit={handleSubmit(onSubmit)}>
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
          autoComplete='email'
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
          <Link href='#'>{DICTIONARY.FORGOT_PASSWORD}</Link>
        </Grid>
        {errorDialog.isOpen && (
          <AlertDialog message={errorDialog.message}></AlertDialog>
        )}
      </form>
      <BackgroundShape></BackgroundShape>
    </>
  );
};

export default Login;
