import gql from 'graphql-tag';
import { FRAGMENTS } from './fragments';

export const NEWBIE_CONTACT_DETAILS = gql`
  query getContactDetails($newbieId: ID!) {
    newbie(newbieId: $newbieId) {
      ...DetailsFragment
      notes
    }
  }
  ${FRAGMENTS.DetailsFragment}
`;

export const BUDDY_CONTACT_DETAILS = gql`
  query getContactDetails($buddyId: ID!) {
    buddy(buddyId: $buddyId) {
      ...DetailsFragment
    }
  }
  ${FRAGMENTS.DetailsFragment}
`;

export default NEWBIE_CONTACT_DETAILS;
