import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, CircularProgress, makeStyles } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import {
  NEWBIE_CONTACT_DETAILS,
  BUDDY_CONTACT_DETAILS,
} from 'graphql/contact-details.graphql';
import { ROUTES } from 'shared/routes';
import { QueryBuddyArgs, QueryNewbieArgs, UserRole } from 'buddy-app-schema';
// import NavBar from 'components/NavBar';
import BackgroundShape from 'components/BackgroundShape';
import AuthContext, { AuthContextData } from 'contexts/AuthContext';
import UserDetails from 'components/UserDetails';
import { BasicDetailsParams, UserBasicDetails } from 'components/UserMenu/types';
import Box from '@material-ui/core/Box';
import PageContainer from 'components/PageContainer/PageContainer';
import { ContactDetailsProps } from './types';

const ContactDetails: React.FC<ContactDetailsProps> = props => {
  const { newbieId } = useParams<QueryNewbieArgs>();
  const { buddyId } = useParams<QueryBuddyArgs>();
  const { data: AuthData } = useContext<AuthContextData>(AuthContext);
  const { role } = AuthData;

  const handleBackClick = () => {
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
    <PageContainer loading={loading}>
      <Box>
        <Typography component='h2' variant='h2'>
          Contact Details
        </Typography>
        {userDetails && <UserDetails details={userDetails} />}
      </Box>
      <BackgroundShape />
    </PageContainer>
  );
};

export default ContactDetails;
