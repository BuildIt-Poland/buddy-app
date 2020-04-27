import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { useForm } from 'react-hook-form';
import { useSnackBar } from 'contexts/SnackbarContext';
import { QueryNewbieArgs, Mutation, TaskInput } from '@buddy-app/schema';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import xss from 'dompurify';
import { ROUTES } from 'shared/routes';
import { ADD_BUDDY_TASK, ADD_NEWBIE_TASK } from 'graphql/add-task.graphql';
import PageContainer from 'atoms/PageContainer';
import Header, { MenuTypes } from 'components/Header';
import RoundedButton from 'atoms/RoundedButton';
import { AddTaskProps } from './types';
import DICTIONARY from './dictionary';

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

const AddTask: React.FC<AddTaskProps> = ({ history }) => {
  const { wrapper, header, addButton, inputWrapper, form } = useStyles();
  const { newbieId } = useParams<QueryNewbieArgs>();
  const { register, errors, handleSubmit } = useForm<TaskInput>();
  const { state } = useLocation();
  const { showSnackbar } = useSnackBar();

  const goBack = () => {
    if (history.length > 2) {
      history.goBack();
    } else {
      history.push(ROUTES.BASE);
    }
  };

  const onCompleted = () => {
    showSnackbar(DICTIONARY.SUCCESS_MESSAGE);
    goBack();
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

  return (
    <>
      <Header type={MenuTypes.BACK} onButtonClick={goBack} />
      <PageContainer backGroundShape data-testid='add-task-page'>
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
      </PageContainer>
    </>
  );
};

export default AddTask;
