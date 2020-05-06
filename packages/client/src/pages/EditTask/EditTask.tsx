import React from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useSnackBar } from 'contexts/SnackbarContext';
import { Query, QueryTaskArgs, Mutation, TaskInput } from '@buddy-app/schema';
import xss from 'dompurify';
import { TASK_DETAILS } from 'graphql/task-details.graphql';
import { UPDATE_TASK } from 'graphql/update-task.graphql';
import TaskForm from 'components/TaskForm';
import FormPlaceHolder from 'atoms/FormPlaceHolder';
import BackPageContainer from 'atoms/BackPageContainer';
import { goBack } from 'utils';
import { EditTaskProps } from './types';
import DICTIONARY from './dictionary';

const EditTask: React.FC<EditTaskProps> = ({ history }) => {
  const { taskId } = useParams<QueryTaskArgs>();
  const { showSnackbar } = useSnackBar();

  const { loading, data } = useQuery<Query, QueryTaskArgs>(TASK_DETAILS, {
    variables: { taskId },
  });

  const [updateTask, { loading: updateLoading }] = useMutation<Mutation>(
    UPDATE_TASK,
    {
      onCompleted: () => {
        showSnackbar(DICTIONARY.SUCCESS_MESSAGE);
        goBack(history);
      },
      onError: () => showSnackbar(DICTIONARY.ERROR_MESSAGE),
    }
  );

  const onSubmit = (input: TaskInput) => {
    updateTask({
      variables: {
        taskId,
        input: {
          ...input,
          description: xss.sanitize(input.description || ''),
        },
      },
    });
  };

  return (
    <BackPageContainer
      title={DICTIONARY.EDIT_TASK_TITLE}
      id='edit-task-page'
      backGroundShape>
      {loading && <FormPlaceHolder />}
      {data && (
        <TaskForm loading={updateLoading} data={data.task} onSubmit={onSubmit} />
      )}
    </BackPageContainer>
  );
};

export default EditTask;
