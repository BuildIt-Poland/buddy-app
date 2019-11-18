import gql from 'graphql-tag';

export const CONTACT_DETAILS = gql`
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

export const BUDDY_BASIC_DETAILS = gql`
  query getBuddyBasicDetails($buddyId: ID!) {
    buddy(buddyId: $buddyId) {
      name
      email
      allowPushedNotifications
      photo
      newbies {
        id
        name
        photo
      }
    }
  }
`;

export const NEWBIE_BASIC_DETAILS = gql`
  query getNewbieBasicDetails($newbieId: ID!) {
    newbie(newbieId: $newbieId) {
      name
      email
      allowPushedNotifications
      photo
      buddy {
        id
        name
        photo
      }
    }
  }
`;

export default CONTACT_DETAILS;
