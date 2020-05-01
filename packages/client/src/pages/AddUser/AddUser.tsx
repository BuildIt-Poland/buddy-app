import React from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useMutation } from '@apollo/react-hooks';
import { Mutation, UserRole, QueryBuddyArgs } from '@buddy-app/schema';
import { ADD_NEWBIE, ADD_BUDDY, ADD_TALENT } from 'graphql/add-user.graphql';
import { ROUTES } from 'shared/routes';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import { useSnackBar } from 'contexts/SnackbarContext';
import Header, { MenuTypes } from 'components/Header';
import PageContainer from 'atoms/PageContainer';
import RoundedButton from 'atoms/RoundedButton';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useAuth } from 'contexts/AuthContext';
import { emailRegExp } from 'utils';
import DICTIONARY from './dictionary';
import { AddUserProps, FormData } from './types';

const useStyles = makeStyles<Theme>(theme => ({
  title: {
    textTransform: 'capitalize',
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(1),
    },
  },
  form: {
    width: '100%',
  },
  submit: {
    margin: theme.spacing(3, 0),
  },
}));

const AddUser: React.FC<AddUserProps> = ({ history }) => {
  const {
    data: { userId },
  } = useAuth();
  const { buddyId } = useParams<QueryBuddyArgs>();
  const userType = history.location.pathname
    .replace(/.+\/add-/, '')
    .toUpperCase() as UserRole;

  const classes = useStyles();
  const { register, errors, handleSubmit } = useForm<FormData>();
  const { showSnackbar } = useSnackBar();
  const today = new Date().toISOString().replace(/T.+/, '');
  const mutationQueries = {
    [UserRole.Newbie]: ADD_NEWBIE,
    [UserRole.Buddy]: ADD_BUDDY,
    [UserRole.Talent]: ADD_TALENT,
  };

  const goBack = () => {
    if (history.length > 2) {
      history.goBack();
    } else {
      history.push(ROUTES.BASE);
    }
  };

  const onCompleted = () => {
    showSnackbar(DICTIONARY.DIALOG.SUCCESS_MSG);
    goBack();
  };

  const [addUser, { loading }] = useMutation<Partial<Mutation>>(
    mutationQueries[userType],
    {
      onCompleted,
      onError: error => {
        showSnackbar((error && error.message) || DICTIONARY.DIALOG.ERROR_MSG);
      },
    }
  );

  const onFormChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    if (e.target.type !== 'file') {
      e.target.value = e.target.value.trim();
    }
  };

  const onSubmit = (input: FormData) => {
    addUser({
      variables: {
        buddyId: buddyId || userId,
        input,
      },
    });
  };

  return (
    <>
      <Header type={MenuTypes.BACK} onButtonClick={goBack} />
      <PageContainer data-testid='add-user-page' backGroundShape>
        <Box className={classes.title} component='section'>
          <Typography component='h1' variant='h2'>
            {DICTIONARY.TITLES[userType]}
          </Typography>
        </Box>
        <form
          className={classes.form}
          data-testid='form'
          noValidate
          onChange={onFormChange}
          onSubmit={handleSubmit(onSubmit)}>
          <input ref={register()} type='hidden' name='password' value='' />
          <TextField
            inputProps={{ 'data-testid': 'name' }}
            inputRef={register({
              required: DICTIONARY.NAME.REQUIRED,
            })}
            margin={'dense'}
            fullWidth
            label={DICTIONARY.NAME.LABEL}
            name='name'
            autoComplete='name'
            autoFocus
            error={!!errors.name}
            helperText={(errors.name && errors.name.message) || ' '}
          />
          <TextField
            inputProps={{ 'data-testid': 'email' }}
            inputRef={register({
              required: DICTIONARY.EMAIL.REQUIRED,
              pattern: {
                value: emailRegExp,
                message: DICTIONARY.EMAIL.INVALID,
              },
            })}
            margin={'dense'}
            fullWidth
            label={DICTIONARY.EMAIL.LABEL}
            name='email'
            autoComplete='email'
            error={!!errors.email}
            helperText={(errors.email && errors.email.message) || ' '}
          />
          <TextField
            inputProps={{ 'data-testid': 'position' }}
            inputRef={register()}
            margin={'dense'}
            fullWidth
            label={DICTIONARY.POSITION.LABEL}
            name='position'
            autoComplete='position'
            helperText={' '}
          />
          <TextField
            inputProps={{ 'data-testid': 'phoneNumber' }}
            inputRef={register()}
            margin={'dense'}
            fullWidth
            label={DICTIONARY.PHONE.LABEL}
            name='phoneNumber'
            type='tel'
            autoComplete='phoneNumber'
            helperText={' '}
          />
          <TextField
            inputProps={{ 'data-testid': 'photo' }}
            inputRef={register()}
            margin={'dense'}
            fullWidth
            label={DICTIONARY.PHOTO.LABEL}
            name='photo'
            autoComplete='photo'
            helperText={' '}
          />
          <TextField
            inputProps={{ 'data-testid': 'startDate' }}
            inputRef={register()}
            margin={'dense'}
            fullWidth
            label={DICTIONARY.START_DATE.LABEL}
            name='startDate'
            type='date'
            defaultValue={today}
            InputLabelProps={{
              shrink: true,
            }}
            helperText={' '}
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
        </form>
      </PageContainer>
    </>
  );
};

export default AddUser;
