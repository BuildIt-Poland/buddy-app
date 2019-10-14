import React from 'react';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import RoundedButton from '../RoundedButton';
import { ReactComponent as SpaceMan } from '../../svg/spaceman.svg';

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

export default function SignIn() {
  const classes = useStyles();

  return (
    <>
      <section className={classes.paper}>
        <Typography component='h1' variant='h1'>
          Buddy
        </Typography>
        <SpaceMan className={classes.spaceMan} />
        <form noValidate>
          <TextField
            id='email'
            margin='normal'
            fullWidth
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
          />
          <TextField
            id='password'
            margin='normal'
            fullWidth
            name='password'
            label='Password'
            type='password'
            autoComplete='current-password'
          />
          <RoundedButton
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}>
            Sign In
          </RoundedButton>
          <Grid container justify='flex-end'>
            <Link href='#'>Forgot password?</Link>
          </Grid>
        </form>
      </section>
    </>
  );
}
