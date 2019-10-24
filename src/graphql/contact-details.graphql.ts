import gql from 'graphql-tag';

export const CONTACT_INFO = gql`
  query getContactDetails($newbieId: ID!) {
    newbie(newbieId: $newbieId) {
      name
      position
      startDate
      email
      phoneNumber
      photo
      notes
    }
  }
`;
