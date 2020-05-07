import React from 'react';
import { useParams } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { Mutation, UserRole, QueryBuddyArgs, UserInput } from '@buddy-app/schema';
import { ADD_NEWBIE, ADD_BUDDY, ADD_TALENT } from 'graphql/add-user.graphql';
import { useSnackBar } from 'contexts/SnackbarContext';
import { useAuth } from 'contexts/AuthContext';
import BackPageContainer from 'atoms/BackPageContainer';
import UserForm from 'components/UserForm';
import { goBack, isNewbie } from 'utils';
import DICTIONARY from './dictionary';
import { AddUserProps } from './types';

const mutationQueries = {
  [UserRole.Newbie]: ADD_NEWBIE,
  [UserRole.Buddy]: ADD_BUDDY,
  [UserRole.Talent]: ADD_TALENT,
};

const AddUser: React.FC<AddUserProps> = ({ history }) => {
  const {
    data: { userId },
  } = useAuth();
  const { buddyId } = useParams<QueryBuddyArgs>();
  const userType = history.location.pathname
    .replace(/.+\/add-/, '')
    .toUpperCase() as UserRole;

  const { showSnackbar } = useSnackBar();

  const onCompleted = () => {
    showSnackbar(DICTIONARY.DIALOG.SUCCESS_MSG);
    goBack(history);
  };

  const [addUser, { loading }] = useMutation<Partial<Mutation>>(
    mutationQueries[userType],
    {
      onCompleted,
      onError: error => {
        showSnackbar(
          (error && error.message.replace('GraphQL e', 'E')) ||
            DICTIONARY.DIALOG.ERROR_MSG
        );
      },
    }
  );
  const onSubmit = (input: UserInput) => {
    addUser({
      variables: {
        buddyId: buddyId || userId,
        input,
      },
    });
  };

  return (
    <BackPageContainer
      title={DICTIONARY.TITLES[userType]}
      id='add-user-page'
      backGroundShape>
      <UserForm
        loading={loading}
        isNewbie={isNewbie(userType)}
        onSubmit={onSubmit}
      />
    </BackPageContainer>
  );
};

export default AddUser;
