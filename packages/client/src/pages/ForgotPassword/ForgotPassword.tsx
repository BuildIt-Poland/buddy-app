import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { Mutation } from '@buddy-app/schema';
import { FORGOT_PASSWORD_MUTATION } from 'graphql/forgot-password.graphql';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useForm } from 'react-hook-form';
import AuthContainer from 'atoms/AuthContainer';
import { useDialog } from 'contexts/DialogContext';
import RoundedButton from 'atoms/RoundedButton';
import { auth } from 'utils';
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
  toLogin: {
    fontSize: '1.5rem',
    '&:hover': {
      color: theme.palette.action.active,
    },
  },
}));

const ForgotPassword: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { register, errors, handleSubmit } = useForm<FormData>();
  const { showDialog } = useDialog();
  const url = `${window.location.origin}/reset-password`;

  const onCompleted = (data?: any) => {
    if (data) {
      auth.setForgotPasswordUser(data.sendResetPasswordLink);
    }
    showDialog(DICTIONARY.DIALOG.SUCCESS_MSG, DICTIONARY.DIALOG.SUCCESS_TITLE);
    history.push(ROUTES.LOGIN);
  };

  const [sendResetPasswordLink, { loading }] = useMutation<Partial<Mutation>>(
    FORGOT_PASSWORD_MUTATION,
    {
      onCompleted,
      onError: error => {
        if (error) {
          if (error.networkError) {
            showDialog(DICTIONARY.ERRORS.NO_NETWORK);
          } else {
            onCompleted();
          }
        }
      },
    }
  );

  const onFormChange = (e: React.ChangeEvent<HTMLFormElement>) =>
    (e.target.value = e.target.value.trim());

  const onSubmit = ({ email }: FormData) => {
    sendResetPasswordLink({
      variables: {
        email,
        url,
      },
    });
  };

  return (
    <AuthContainer data-testid='forgot-password-page' title={DICTIONARY.TITLE}>
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
          <Link to={ROUTES.LOGIN} className={classes.toLogin}>
            {DICTIONARY.TO_LOGIN}
          </Link>
        </Grid>
      </form>
    </AuthContainer>
  );
};

export default ForgotPassword;
