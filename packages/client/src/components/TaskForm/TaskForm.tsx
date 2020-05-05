import React from 'react';
import { useForm } from 'react-hook-form';
import { TaskInput } from '@buddy-app/schema';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import RoundedButton from 'atoms/RoundedButton';
import { TaskFormProps } from './types';

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  inputWrapper: {
    flex: 1,
  },
  addButton: {
    margin: theme.spacing(5, 0, 4),
  },
}));

const TaskForm: React.FC<TaskFormProps> = ({
  dictionary,
  loading,
  data,
  onSubmit,
}) => {
  const { addButton, inputWrapper, form } = useStyles();
  const { register, errors, handleSubmit } = useForm<TaskInput>();

  return (
    <form
      className={form}
      data-testid='form'
      noValidate
      onSubmit={handleSubmit(onSubmit)}>
      <Box className={inputWrapper}>
        <TextField
          inputProps={{ 'data-testid': 'title' }}
          inputRef={register({
            required: dictionary.TITLE.REQUIRED,
          })}
          margin={'normal'}
          fullWidth
          label={dictionary.TITLE.LABEL}
          name='title'
          autoFocus
          defaultValue={data && data.title}
          error={!!errors.title}
          helperText={errors.title && errors.title.message}
        />
        <TextField
          inputProps={{ 'data-testid': 'description' }}
          inputRef={register({
            required: dictionary.DESCRIPTION.REQUIRED,
          })}
          margin={'normal'}
          fullWidth
          name='description'
          label={dictionary.DESCRIPTION.LABEL}
          multiline
          autoComplete='current-password'
          defaultValue={data && data.description}
          error={!!errors.description}
          helperText={
            (errors.description && errors.description.message) ||
            dictionary.DESCRIPTION.HELPER_TEXT
          }
        />
      </Box>
      <RoundedButton
        data-testid='add-task-button'
        type='submit'
        fullWidth
        variant='contained'
        color='primary'
        disabled={loading}
        className={addButton}>
        {loading ? (
          <CircularProgress
            data-testid='add-task-progress'
            variant={'indeterminate'}
            size={32}
          />
        ) : (
          <strong>{dictionary.BUTTON_TEXT}</strong>
        )}
      </RoundedButton>
    </form>
  );
};

export default TaskForm;
