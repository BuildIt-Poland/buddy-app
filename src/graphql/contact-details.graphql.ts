import gql from 'graphql-tag';

export const NEWBIE_CONTACT_DETAILS = gql`
  query getContactDetails($newbieId: ID!) {
    newbie(newbieId: $newbieId) {
      name
      position
      startDate
      email
      phoneNumber
      photo
      role
      notes
    }
  }
`;

export const BUDDY_CONTACT_DETAILS = gql`
  query getContactDetails($buddyId: ID!) {
    buddy(buddyId: $buddyId) {
      name
      position
      startDate
      email
      phoneNumber
      photo
      role
    }
  }
`;
