import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
  Mutation,
  QueryBuddyArgs,
  QueryNewbieArgs,
  UserInput,
} from '@buddy-app/schema';
import { UPDATE_USER_MUTATION } from 'graphql/update-user.graphql';
import { useSnackBar } from 'contexts/SnackbarContext';
import UserForm from 'components/UserForm';
import FormPlaceHolder from 'atoms/FormPlaceHolder';
import BackPageContainer from 'atoms/BackPageContainer';
import { useAuth } from 'contexts/AuthContext';
import { goBack } from 'utils';
import {
  getQueryData,
  BasicDetailsParams,
  UserBasicDetails,
} from 'pages/ContactDetails';
import DICTIONARY from './dictionary';
import { EditUserProps } from './types';

const EditUser: React.FC<EditUserProps> = ({ history }) => {
  const {
    data: { role, userId },
  } = useAuth();
  const { newbieId, buddyId } = useParams<QueryNewbieArgs & QueryBuddyArgs>();
  const { showSnackbar } = useSnackBar();

  const { query, variables, userRole } = getQueryData(userId, newbieId, buddyId)[
    role
  ];

  const { data, loading } = useQuery<UserBasicDetails, BasicDetailsParams>(query, {
    variables,
  });

  const userDetails = data && data[userRole.toLowerCase()];

  const [updateUser, { loading: updateLoading }] = useMutation<Partial<Mutation>>(
    UPDATE_USER_MUTATION,
    {
      onCompleted: () => {
        showSnackbar(DICTIONARY.DIALOG.SUCCESS_MSG);
        goBack(history);
      },
      onError: error => {
        showSnackbar((error && error.message) || DICTIONARY.DIALOG.ERROR_MSG);
      },
    }
  );

  const onSubmit = (input: UserInput) => {
    updateUser({
      variables: {
        userId: newbieId || buddyId || userId,
        input,
      },
    });
  };

  return (
    <BackPageContainer title={DICTIONARY.TITLE} id='add-user-page' backGroundShape>
      {loading && <FormPlaceHolder />}
      {userDetails && (
        <UserForm
          loading={updateLoading}
          isNewbie={!!newbieId}
          data={userDetails}
          onSubmit={onSubmit}
        />
      )}
    </BackPageContainer>
  );
};

export default EditUser;
