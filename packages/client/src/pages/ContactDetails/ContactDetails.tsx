import React from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
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
import Box from '@material-ui/core/Box';
import PageContainer from 'atoms/PageContainer';
import Header, { MenuTypes } from 'components/Header';
import { ROUTES } from 'shared/routes';
import ContactDetailsPlaceHolder from 'atoms/ContactDetailsPlaceHolder';
import { ContactDetailsProps } from './types';

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
        },
        [UserRole.Buddy]: {
          query: BUDDY_CONTACT_DETAILS,
          variables: { buddyId: userId },
          userRole: UserRole.Buddy.toLowerCase(),
        },
        [UserRole.Talent]: {
          query: TALENT_CONTACT_DETAILS,
          variables: { talentId: userId },
          userRole: UserRole.Talent.toLowerCase(),
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
        },
        [UserRole.Talent]: {
          query: newbieId ? NEWBIE_CONTACT_DETAILS : BUDDY_CONTACT_DETAILS,
          variables: { newbieId, buddyId },
          userRole: newbieId
            ? UserRole.Newbie.toLowerCase()
            : UserRole.Buddy.toLowerCase(),
        },
      };

  const goBack = () => {
    if (history.length > 2) {
      history.goBack();
    } else {
      history.push(ROUTES.BASE);
    }
  };

  const { query, variables, userRole } = queryByRole[role];
  const { data, loading } = useQuery<UserBasicDetails, BasicDetailsParams>(query, {
    variables,
  });
  const userDetails = data && data[userRole as string];

  return (
    <>
      <Header type={MenuTypes && MenuTypes.BACK} onButtonClick={goBack} />
      <PageContainer backGroundShape>
        <Box>
          <Typography component='h2' variant='h2'>
            Contact Details
          </Typography>
          {loading && <ContactDetailsPlaceHolder />}
          {userDetails && <UserDetails details={userDetails} />}
        </Box>
      </PageContainer>
    </>
  );
};

export default ContactDetails;
