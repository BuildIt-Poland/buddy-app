import React from 'react';
import { useForm } from 'react-hook-form';
import { makeStyles, Theme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import RoundedButton from 'atoms/RoundedButton';
import { emailRegExp } from 'utils';
import DICTIONARY from './dictionary';
import { UserFormProps, FormData } from './types';

const useStyles = makeStyles<Theme>(theme => ({
  form: {
    width: '100%',
  },
  submit: {
    margin: theme.spacing(3, 0),
  },
}));

const trimInputs = ['email', 'phoneNumber', 'photo'];

const UserForm: React.FC<UserFormProps> = ({
  loading,
  data,
  isNewbie,
  onSubmit,
}) => {
  const classes = useStyles();
  const { register, errors, handleSubmit } = useForm<FormData>();
  const startDate = (data && data.startDate) || new Date().toISOString();
  const date = startDate.replace(/T.+/, '');

  const onFormChange = ({ target }: React.ChangeEvent<HTMLFormElement>) => {
    if (trimInputs.includes(target.name)) {
      target.value = target.value.trim();
    }
  };

  const onFormSubmit = (input: FormData) => {
    if (!input.startDate) {
      input.startDate = null;
    }
    onSubmit(input);
  };

  return (
    <form
      className={classes.form}
      data-testid='form'
      noValidate
      onChange={onFormChange}
      onSubmit={handleSubmit(onFormSubmit)}>
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
        defaultValue={data && data.name}
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
        defaultValue={data && data.email}
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
        defaultValue={data && data.position}
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
        defaultValue={data && data.phoneNumber}
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
        defaultValue={data && data.photo}
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
        defaultValue={date}
        InputLabelProps={{
          shrink: true,
        }}
        helperText={' '}
      />
      {isNewbie && (
        <TextField
          inputProps={{ 'data-testid': 'notes' }}
          inputRef={register()}
          margin={'dense'}
          fullWidth
          label={DICTIONARY.NOTES.LABEL}
          name='notes'
          autoComplete='notes'
          defaultValue={data && data.notes}
          helperText={' '}
        />
      )}
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
  );
};

export default UserForm;
