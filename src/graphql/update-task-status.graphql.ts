import gql from 'graphql-tag';

export const UPDATE_TASK_STATUS = gql`
  mutation updateTaskStatus($taskId: ID!) {
    updateTaskStatus(taskId: $taskId) {
      id
      status
      newbie {
        id
      }
    }
  }
`;
