import gql from 'graphql-tag';

export const ADD_NEWBIE = gql`
  mutation addNewbie($buddyId: ID!, $input: UserInput!) {
    addNewbie(buddyId: $buddyId, input: $input) {
      buddy {
        id
        newbies {
          id
        }
      }
    }
  }
`;

export const ADD_BUDDY = gql`
  mutation addBuddy($input: UserInput!) {
    addBuddy(input: $input) {
      talents {
        id
        buddies {
          id
        }
      }
    }
  }
`;

export const ADD_TALENT = gql`
  mutation addTalent($input: UserInput!) {
    addTalent(input: $input) {
      id
    }
  }
`;
