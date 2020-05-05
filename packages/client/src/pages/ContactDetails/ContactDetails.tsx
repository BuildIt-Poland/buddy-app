import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import {
  NEWBIE_CONTACT_DETAILS,
  BUDDY_CONTACT_DETAILS,
  TALENT_CONTACT_DETAILS,
} from 'graphql/contact-details.graphql';
import { QueryBuddyArgs, QueryNewbieArgs, UserRole } from '@buddy-app/schema';
import { useAuth } from 'contexts/AuthContext';
import UserDetails from 'components/UserDetails';
import { BasicDetailsParams, UserBasicDetails } from 'components/UserMenu/types';
import BackPageContainer from 'atoms/BackPageContainer';
import ContactDetailsPlaceHolder from 'atoms/ContactDetailsPlaceHolder';
import EditButton from 'atoms/EditButton';
import { ROUTES } from 'shared/routes';
import { ContactDetailsProps } from './types';
import DICTIONARY from './dictionary';

const ContactDetails: React.FC<ContactDetailsProps> = ({ history }) => {
  const { newbieId, buddyId } = useParams<QueryNewbieArgs & QueryBuddyArgs>();
  const isCurrentUserDetails = !newbieId && !buddyId;
  const {
    data: { role, userId },
  } = useAuth();

  const queryByRole = isCurrentUserDetails
    ? {
        [UserRole.Newbie]: {
          query: NEWBIE_CONTACT_DETAILS,
          variables: { newbieId: userId },
          userRole: UserRole.Newbie.toLowerCase(),
          editRoute: ROUTES.NEWBIE_EDIT_DETAILS,
        },
        [UserRole.Buddy]: {
          query: BUDDY_CONTACT_DETAILS,
          variables: { buddyId: userId },
          userRole: UserRole.Buddy.toLowerCase(),
          editRoute: ROUTES.BUDDY_EDIT_DETAILS,
        },
        [UserRole.Talent]: {
          query: TALENT_CONTACT_DETAILS,
          variables: { talentId: userId },
          userRole: UserRole.Talent.toLowerCase(),
          editRoute: ROUTES.TALENT_EDIT_DETAILS,
        },
      }
    : {
        [UserRole.Newbie]: {
          query: BUDDY_CONTACT_DETAILS,
          variables: { buddyId },
          userRole: UserRole.Buddy.toLowerCase(),
        },
        [UserRole.Buddy]: {
          query: NEWBIE_CONTACT_DETAILS,
          variables: { newbieId },
          userRole: UserRole.Newbie.toLowerCase(),
          editRoute: ROUTES.BUDDY_EDIT_NEWBIE_DETAILS.replace(':newbieId', newbieId),
        },
        [UserRole.Talent]: {
          query: newbieId ? NEWBIE_CONTACT_DETAILS : BUDDY_CONTACT_DETAILS,
          variables: { newbieId, buddyId },
          userRole: newbieId
            ? UserRole.Newbie.toLowerCase()
            : UserRole.Buddy.toLowerCase(),
          editRoute: newbieId
            ? ROUTES.TALENT_EDIT_NEWBIE_DETAILS.replace(':newbieId', newbieId)
            : ROUTES.TALENT_EDIT_BUDDY_DETAILS.replace(':buddyId', buddyId),
        },
      };

  const { query, variables, userRole, editRoute } = queryByRole[role];
  const { data, loading } = useQuery<UserBasicDetails, BasicDetailsParams>(query, {
    variables,
  });
  const userDetails = data && data[userRole as string];

  return (
    <BackPageContainer
      title={DICTIONARY.TITLE}
      id='contact-details-page'
      backGroundShape>
      {loading && <ContactDetailsPlaceHolder />}
      {userDetails && <UserDetails details={userDetails} />}
      {editRoute && (
        <Link to={editRoute}>
          <EditButton
            aria-label='Edit contact details'
            title={DICTIONARY.EDIT_BUTTON_TITLE}
          />
        </Link>
      )}
    </BackPageContainer>
  );
};

export default ContactDetails;
