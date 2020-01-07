import React from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import {
  NEWBIE_CONTACT_DETAILS,
  BUDDY_CONTACT_DETAILS,
} from 'graphql/contact-details.graphql';
import { ROUTES } from 'shared/routes';
import { QueryBuddyArgs, QueryNewbieArgs, UserRole } from 'buddy-app-schema';
import { useAuth } from 'contexts/AuthContext';
import UserDetails from 'components/UserDetails';
import { BasicDetailsParams, UserBasicDetails } from 'components/UserMenu/types';
import Box from '@material-ui/core/Box';
import PageContainer from 'components/PageContainer';
import Header, { MenuTypes } from 'components/Header';
import { ContactDetailsProps } from './types';

const ContactDetails: React.FC<ContactDetailsProps> = props => {
  const { newbieId } = useParams<QueryNewbieArgs>();
  const { buddyId } = useParams<QueryBuddyArgs>();
  const [
    {
      data: { role },
    },
  ] = useAuth();

  const onBackClick = () => {
    props.history.push(ROUTES.BUDDY_TASKS_LIST.replace(':newbieId', newbieId));
  };

  const queryByRole = {
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
  };
  const { query, variables, userRole } = queryByRole[role];
  const { data, loading } = useQuery<UserBasicDetails, BasicDetailsParams>(query, {
    variables,
  });
  const userDetails = data && data[userRole as string];

  return (
    <>
      <Header
        type={MenuTypes && MenuTypes.BACK}
        loading={loading}
        onButtonClick={onBackClick}
      />
      <PageContainer backGroundShape>
        <Box>
          <Typography component='h2' variant='h2'>
            Contact Details
          </Typography>
          {userDetails && <UserDetails details={userDetails} />}
        </Box>
      </PageContainer>
    </>
  );
};

export default ContactDetails;
