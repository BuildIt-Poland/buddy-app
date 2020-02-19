import gql from 'graphql-tag';

export const UPDATE_TASK_STATUS = gql`
  mutation updateTaskStatus($taskId: ID!) {
    updateTaskStatus(taskId: $taskId) {
      id
      status
      title
      description
      newbie {
        id
      }
    }
  }
`;
