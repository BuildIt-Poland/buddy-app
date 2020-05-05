import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { useSnackBar } from 'contexts/SnackbarContext';
import { QueryNewbieArgs, Mutation, TaskInput } from '@buddy-app/schema';
import xss from 'dompurify';
import { ADD_BUDDY_TASK, ADD_NEWBIE_TASK } from 'graphql/add-task.graphql';
import TaskForm from 'components/TaskForm';
import { goBack } from 'utils';
import BackPageContainer from 'atoms/BackPageContainer';
import { AddTaskProps } from './types';
import DICTIONARY from './dictionary';

const AddTask: React.FC<AddTaskProps> = ({ history }) => {
  const { newbieId } = useParams<QueryNewbieArgs>();
  const { state } = useLocation();
  const { showSnackbar } = useSnackBar();

  const onCompleted = () => {
    showSnackbar(DICTIONARY.SUCCESS_MESSAGE);
    goBack(history);
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
    <BackPageContainer
      title={DICTIONARY.ADD_TASK_TITLE}
      id='add-task-page'
      backGroundShape>
      <TaskForm dictionary={DICTIONARY} loading={loading} onSubmit={onSubmit} />
    </BackPageContainer>
  );
};

export default AddTask;
