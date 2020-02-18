import gql from 'graphql-tag';

export const UPDATE_TASK = gql`
  mutation updateTask($taskId: ID!, $input: TaskInput!) {
    updateTask(taskId: $taskId, input: $input) {
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
