import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import useForm from 'react-hook-form';
import { QueryNewbieArgs, Mutation, TaskInput } from 'buddy-app-schema';
import {
  makeStyles,
  Typography,
  Box,
  CircularProgress,
  TextField,
} from '@material-ui/core';
import xss from 'dompurify';
import { ADD_BUDDY_TASK, ADD_NEWBIE_TASK } from 'graphql/add-task.graphql';
import withSnackBar from 'decorators/withSnackBar';
import PageContainer from 'components/PageContainer/PageContainer';
import RoundedButton from '../RoundedButton';
import { AddTaskProps } from './types';
import DICTIONARY from './addTask.dictionary';

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: theme.spacing(1, 0, 2),
  },
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

const AddTask: React.FC<AddTaskProps> = ({ history, showSnackbar }) => {
  const { wrapper, header, addButton, inputWrapper, form } = useStyles();
  const { newbieId } = useParams<QueryNewbieArgs>();
  const { register, errors, handleSubmit, reset } = useForm<TaskInput>();
  const { pathname, state } = useLocation();

  const onCompleted = () => {
    showSnackbar(DICTIONARY.SUCCESS_MESSAGE);
    reset();
  };

  const onError = () => showSnackbar(DICTIONARY.ERROR_MESSAGE);

  const [addBuddyTask, { loading: addBuddyTaskLoading }] = useMutation<Mutation>(
    ADD_BUDDY_TASK,
    { onCompleted, onError }
  );

  const [addNewbieTask, { loading: addNewbieTaskLoading }] = useMutation<Mutation>(
    ADD_NEWBIE_TASK,
    { onCompleted, onError }
  );

  const addTaskHandlers = [addNewbieTask, addBuddyTask];
  const defaultTabIndex = (state && state.tabIndex) || 0;
  const loading = addBuddyTaskLoading || addNewbieTaskLoading;
  const taskListPath = pathname.replace('add-task', 'tasks');

  const onSubmit = (input: TaskInput) => {
    addTaskHandlers[defaultTabIndex]({
      variables: {
        newbieId,
        input: {
          ...input,
          description: xss.sanitize(input.description || ''),
        },
      },
    });
  };

  const onBackClick = () =>
    history.push({ pathname: taskListPath, state: { defaultTabIndex } });

  const renderAddTask = () => (
    <Box className={wrapper}>
      <Box className={header}>
        <Typography component='h2' variant='h2'>
          {DICTIONARY.ADD_TASK_TITLE}
        </Typography>
      </Box>
      <form
        className={form}
        data-testid='form'
        noValidate
        onSubmit={handleSubmit(onSubmit)}>
        <Box className={inputWrapper}>
          <TextField
            inputProps={{ 'data-testid': 'title' }}
            inputRef={register({
              required: DICTIONARY.TITLE.REQUIRED,
            })}
            margin={'normal'}
            fullWidth
            label={DICTIONARY.TITLE.LABEL}
            name='title'
            autoFocus
            error={!!errors.title}
            helperText={errors.title && errors.title.message}
          />
          <TextField
            inputProps={{ 'data-testid': 'description' }}
            inputRef={register({
              required: DICTIONARY.DESCRIPTION.REQUIRED,
            })}
            margin={'normal'}
            fullWidth
            name='description'
            label={DICTIONARY.DESCRIPTION.LABEL}
            multiline
            autoComplete='current-password'
            error={!!errors.description}
            helperText={
              (errors.description && errors.description.message) ||
              DICTIONARY.DESCRIPTION.HELPER_TEXT
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
            <strong>{DICTIONARY.BUTTON_TEXT}</strong>
          )}
        </RoundedButton>
      </form>
    </Box>
  );

  return (
    <PageContainer backGroundShape data-testid='add-task-page'>
      {/* <NavBar type='back' onClick={onBackClick} /> */}
      {renderAddTask()}
    </PageContainer>
  );
};

export default withSnackBar(AddTask);
