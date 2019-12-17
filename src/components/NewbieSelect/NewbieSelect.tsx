import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import { useQuery } from '@apollo/react-hooks';
import Box from '@material-ui/core/Box';
import { QueryBuddyArgs, Query, Newbie } from 'buddy-app-schema';
import AuthContext, { AuthContextData } from 'contexts/AuthContext';
import { NEWBIE_SELECT } from 'graphql/newbie-select.graphql';
import PlusButton from 'components/PlusButton';
import NewbieGrid from 'components/NewbieGrid';
import PageContainer from 'components/PageContainer';
import Header, { MenuTypes } from 'components/Header';
import MenuContext, { MenuContextData } from 'contexts/MenuContext';
import NewbieSelectDictionary from './dictionary';

const NewbieSelect: React.FC = () => {
  const { data: AuthData } = useContext<AuthContextData>(AuthContext);
  const { loading, data } = useQuery<Query, QueryBuddyArgs>(NEWBIE_SELECT, {
    variables: { buddyId: AuthData.userId },
  });
  const { toggleMenu } = React.useContext<MenuContextData>(MenuContext);

  return (
    <>
      <Header type={MenuTypes.MENU} onButtonClick={toggleMenu} loading={loading} />
      <PageContainer data-testid='newbie-select-page' backGroundShape>
        <Box m='0 0 5rem' component='section'>
          <Typography component='h1' variant='h2'>
            {NewbieSelectDictionary.TITLE}
          </Typography>
          <Typography color='textSecondary' component='p' variant='body2'>
            {NewbieSelectDictionary.SUBTITLE}
          </Typography>
        </Box>
        {data && data.buddy.newbies && (
          <Box m='0 0 2rem' component={'section'}>
            <NewbieGrid newbies={data.buddy.newbies as Newbie[]} />
          </Box>
        )}
        <PlusButton disabled />
      </PageContainer>
    </>
  );
};

export default NewbieSelect;
