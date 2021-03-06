import gql from 'graphql-tag';

export const ADD_BUDDY_TASK = gql`
  mutation addBuddyTask($newbieId: ID!, $input: TaskInput!) {
    addBuddyTask(newbieId: $newbieId, input: $input) {
      id
      newbie {
        id
        buddyTasks {
          id
        }
      }
    }
  }
`;

export const ADD_NEWBIE_TASK = gql`
  mutation addNewbieTask($newbieId: ID!, $input: TaskInput!) {
    addNewbieTask(newbieId: $newbieId, input: $input) {
      id
      newbie {
        id
        newbieTasks {
          id
        }
      }
    }
  }
`;
