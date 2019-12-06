import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import { useQuery } from '@apollo/react-hooks';
import Box from '@material-ui/core/Box';
import { QueryBuddyArgs, Query, Newbie } from 'buddy-app-schema';
import AuthContext, { AuthContextData } from 'contexts/AuthContext';
import { NEWBIE_SELECT } from 'graphql/newbie-select.graphql';
import PlusButton from 'components/PlusButton';
import Carrousel from 'components/Carrousel';
import PageContainer from 'components/PageContainer';
import NewbieSelectDictionary from './newbieSelect.dictionary';

const NewbieSelect: React.FC = () => {
  const { data: AuthData } = useContext<AuthContextData>(AuthContext);
  const { loading, data } = useQuery<Query, QueryBuddyArgs>(NEWBIE_SELECT, {
    variables: { buddyId: AuthData.userId },
  });

  return (
    <PageContainer loading={loading} data-testid='newbie-select-page'>
      <Box marginBottom={5} component='section'>
        <Typography component='h1' variant='h2'>
          {NewbieSelectDictionary.TITLE}
        </Typography>
        <Typography color='textSecondary' component='p' variant='body2'>
          {NewbieSelectDictionary.SUBTITLE}
        </Typography>
      </Box>
      {data && data.buddy.newbies && (
        <Box marginBottom={2} component={'section'}>
          <Carrousel newbies={data.buddy.newbies as Newbie[]} />
        </Box>
      )}
      <PlusButton disabled />
    </PageContainer>
  );
};

export default NewbieSelect;
