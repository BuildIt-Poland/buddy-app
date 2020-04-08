import React from 'react';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useForm } from 'react-hook-form';
import AuthContainer from 'atoms/AuthContainer';
import { useDialog } from 'contexts/DialogContext';
import { useAuth } from 'contexts/AuthContext';
import RoundedButton from 'atoms/RoundedButton';
import { ROUTES } from 'shared/routes';
import DICTIONARY from './dictionary';
import { FormData } from './types';

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%',
  },
  submit: {
    margin: theme.spacing(3, 0),
  },
  forgotPassword: {
    fontSize: '1.5rem',
    '&:hover': {
      color: theme.palette.action.active,
    },
  },
}));

const Login: React.FC = () => {
  const classes = useStyles();
  const { register, errors, handleSubmit } = useForm<FormData>();
  const { loading, login } = useAuth();
  const { showDialog } = useDialog();

  const onFormChange = (e: React.ChangeEvent<HTMLFormElement>) =>
    (e.target.value = e.target.value.trim());

  const onSubmit = async ({ email, password }: FormData) => {
    try {
      await login(email, password);
    } catch (error) {
      if (error) {
        if (error.networkError) {
          showDialog(DICTIONARY.ERRORS.NO_NETWORK);
        } else {
          showDialog(DICTIONARY.ERRORS.NO_USER_FOUND);
        }
      }
    }
  };

  return (
    <AuthContainer data-testid='login-page' title={DICTIONARY.TITLE}>
      <form
        className={classes.form}
        data-testid='form'
        noValidate
        onChange={onFormChange}
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
            DICTIONARY.SUBMIT
          )}
        </RoundedButton>
        <Grid container justify='flex-end'>
          <Link to={ROUTES.FORGOT_PASSWORD} className={classes.forgotPassword}>
            {DICTIONARY.FORGOT_PASSWORD}
          </Link>
        </Grid>
      </form>
    </AuthContainer>
  );
};

export default Login;
