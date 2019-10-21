import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import useForm from 'react-hook-form';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

import RoundedButton from '../RoundedButton';
import AlertDialog from '../AlertDialog';
import { ROUTES } from '../../shared/routes';
import { ReactComponent as SpaceMan } from '../../svg/spaceman.svg';
import LOGIN_MUTATION from '../../graphql/login.graphql';
import { auth } from '../../utils';
import DICTIONARY from './login.dictionary';

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

interface FormData {
  email: string;
  password: string;
}

interface ErrorDialog {
  isOpen: Boolean;
  message: string;
}

const LoginPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const [errorDialog, setErrorDialog] = useState<ErrorDialog>({
    isOpen: false,
    message: '',
  });

  const { register, errors, handleSubmit } = useForm<FormData>();
  const [loginMutation, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: ({ login }) => {
      auth.setToken(login.token);
      history.push(ROUTES.BUDDY_SELECT_NEWBIE);
    },
  });

  const onSubmit = async ({ email, password }: FormData) => {
    setErrorDialog({
      isOpen: false,
      message: '',
    });
    try {
      await loginMutation({
        variables: {
          email,
          password,
        },
      });
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
      <SpaceMan className={classes.spaceMan} />
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
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
    </>
  );
};

export default LoginPage;
