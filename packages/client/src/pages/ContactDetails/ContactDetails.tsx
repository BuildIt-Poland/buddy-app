import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { QueryBuddyArgs, QueryNewbieArgs } from '@buddy-app/schema';
import { useAuth } from 'contexts/AuthContext';
import UserDetails from 'components/UserDetails';
import BackPageContainer from 'atoms/BackPageContainer';
import ContactDetailsPlaceHolder from 'atoms/ContactDetailsPlaceHolder';
import EditButton from 'atoms/EditButton';
import { getQueryData } from './utils';
import { ContactDetailsProps, BasicDetailsParams, UserBasicDetails } from './types';
import DICTIONARY from './dictionary';

const ContactDetails: React.FC<ContactDetailsProps> = ({ history }) => {
  const { newbieId, buddyId } = useParams<QueryNewbieArgs & QueryBuddyArgs>();
  const {
    data: { role, userId },
  } = useAuth();

  const { query, variables, userRole, editRoute } = getQueryData(
    userId,
    newbieId,
    buddyId
  )[role];

  const { data, loading } = useQuery<UserBasicDetails, BasicDetailsParams>(query, {
    variables,
  });

  const userDetails = data && data[userRole.toLowerCase()];

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
