import gql from 'graphql-tag';

const UPDATE_TASK_STATUS_MUTATION = gql`
  mutation updateTaskStatus($taskId: ID!) {
    updateTaskStatus(taskId: $taskId) {
      status
    }
  }
`;

export default UPDATE_TASK_STATUS_MUTATION;
