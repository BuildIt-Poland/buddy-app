import gql from 'graphql-tag';

export const NEWBIE_CONTACT_DETAILS = gql`
  query getContactDetails($newbieId: ID!) {
    newbie(newbieId: $newbieId) {
      id
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
      id
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

export const TALENT_CONTACT_DETAILS = gql`
  query getContactDetails($talentId: ID!) {
    talent(talentId: $talentId) {
      id
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
