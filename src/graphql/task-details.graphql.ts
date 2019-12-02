import gql from 'graphql-tag';

export const TASK_DETAILS = gql`
  query getTaskDetails($taskId: ID!) {
    task(taskId: $taskId) {
      id
      title
      description
      status
    }
  }
`;
