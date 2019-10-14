import React from 'react';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import useForm from 'react-hook-form';

import RoundedButton from '../RoundedButton';
import { ReactComponent as SpaceMan } from '../../svg/spaceman.svg';
import DICTIONARY from './login.dictionary';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  spaceMan: {
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

interface FormData {
  email: String;
  password: String;
}

export default function SignIn() {
  const classes = useStyles();
  const { register, errors, handleSubmit } = useForm<FormData>();

  const onSubmit = ({ email, password }: FormData) => {
    //call service
  };

  return (
    <section className={classes.paper}>
      <Typography component='h1' variant='h1'>
        {DICTIONARY.TITLE}
      </Typography>
      <SpaceMan className={classes.spaceMan} />
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <TextField
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
          type='submit'
          fullWidth
          variant='contained'
          color='primary'
          className={classes.submit}>
          {DICTIONARY.SIGN_IN}
        </RoundedButton>
        <Grid container justify='flex-end'>
          <Link href='#'>{DICTIONARY.FORGOT_PASSWORD}</Link>
        </Grid>
      </form>
    </section>
  );
}
