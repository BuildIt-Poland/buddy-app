import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, CircularProgress } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import NEWBIE_CONTACT_DETAILS, {
  BUDDY_CONTACT_DETAILS,
} from 'graphql/contact-details.graphql';
import { ROUTES } from 'shared/routes';
import { QueryBuddyArgs, QueryNewbieArgs, UserRole } from 'buddy-app-schema';
import NavBar from 'components/NavBar';
import BackgroundShape from 'components/BackgroundShape/';
import { isBuddy, isNewbie } from 'utils';
import AuthContext, { AuthContextData } from 'contexts/AuthContext';
import UserDetails from 'components/UserDetails';
import { BasicDetailsParams, UserBasicDetails } from 'components/UserMenu/types';
import Box from '@material-ui/core/Box';
import AppWrapper from 'components/AppWrapper';
import { ContactDetailsProps } from './types';

const ContactDetails: React.FC<ContactDetailsProps> = props => {
  const { newbieId } = useParams<QueryNewbieArgs>();
  const { buddyId } = useParams<QueryBuddyArgs>();
  const { data: AuthData } = useContext<AuthContextData>(AuthContext);
  const { role } = AuthData;
  const getQueryByRole = (role: UserRole) => {
    if (isBuddy(role)) {
      return {
        query: NEWBIE_CONTACT_DETAILS,
        variables: { newbieId },
        userRole: UserRole.Newbie.toLowerCase(),
      };
    } else if (isNewbie(role)) {
      return {
        query: BUDDY_CONTACT_DETAILS,
        variables: { buddyId },
        userRole: UserRole.Buddy.toLowerCase(),
      };
    }
  };
  const { query, variables, userRole } = getQueryByRole(role) || {};
  const { data, loading } = useQuery<UserBasicDetails, BasicDetailsParams>(query, {
    variables,
  });
  const userBasicDetails = data && data[userRole as string];

  return (
    <AppWrapper>
      <NavBar
        type='back'
        onClick={() =>
          props.history.push(ROUTES.BUDDY_TASKS_LIST.replace(':newbieId', newbieId))
        }
      />
      <Box>
        <Typography component='h2' variant='h2'>
          Contact Details
        </Typography>
        {loading && <CircularProgress />}
        {userBasicDetails && <UserDetails details={userBasicDetails} />}
      </Box>
      <BackgroundShape />
    </AppWrapper>
  );
};

export default ContactDetails;
