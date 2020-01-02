import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import useForm from 'react-hook-form';
import { ReactComponent as SpaceManLogo } from 'assets/svg/spaceman.svg';
import PageContainer from 'components/PageContainer/PageContainer';
import { useAuth, login } from 'contexts/AuthContext';
import RoundedButton from '../RoundedButton';
import AlertDialog from '../AlertDialog';
import DICTIONARY from './dictionary';
import { ErrorDialog, FormData } from './types';

const useStyles = makeStyles(theme => ({
  spaceMan: {
    display: 'block',
    margin: '0 auto',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0),
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
  },
}));

const Login: React.FC = () => {
  const classes = useStyles();
  const [errorDialog, setErrorDialog] = useState<ErrorDialog>({
    isOpen: false,
    message: '',
  });
  const { register, errors, handleSubmit } = useForm<FormData>();
  const [{ loading, error }, dispatch] = useAuth();

  const onSubmit = ({ email, password }: FormData) => {
    setErrorDialog({
      isOpen: false,
      message: '',
    });

    login(dispatch, email, password);
  };

  useEffect(() => {
    if (error) {
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
  }, [error, setErrorDialog]);

  return (
    <PageContainer backGroundShape data-testid='login-page' maxWidth='md'>
      <Typography component='h1' variant='h1' align='center'>
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
          <Link href='#'>{DICTIONARY.FORGOT_PASSWORD}</Link>
        </Grid>
        {errorDialog.isOpen && <AlertDialog message={errorDialog.message} />}
      </form>
    </PageContainer>
  );
};

export default Login;
