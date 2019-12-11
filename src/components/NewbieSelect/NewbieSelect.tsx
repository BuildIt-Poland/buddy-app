import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import { useQuery } from '@apollo/react-hooks';
import Box from '@material-ui/core/Box';
import { QueryBuddyArgs, Query, Newbie } from 'buddy-app-schema';
import AuthContext, { AuthContextData } from 'contexts/AuthContext';
import { NEWBIE_SELECT } from 'graphql/newbie-select.graphql';
import { makeStyles, Theme } from '@material-ui/core/styles';
import PlusButton from 'components/PlusButton';
import Carrousel from 'components/Carrousel';
import PageContainer from 'components/PageContainer';
import Header, { MenuTypes } from 'components/Header';
import MenuContext, { MenuContextData } from 'contexts/MenuContext';
import NewbieSelectDictionary from './dictionary';

const useStyles = makeStyles<Theme>(theme => ({
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(5),
    paddingRight: theme.spacing(7),
  },
  carrouselWarpper: {
    marginBottom: theme.spacing(2),
    paddingRight: theme.spacing(7),
  },
}));

const NewbieSelect: React.FC = () => {
  const { data: AuthData } = useContext<AuthContextData>(AuthContext);
  const { loading, data } = useQuery<Query, QueryBuddyArgs>(NEWBIE_SELECT, {
    variables: { buddyId: AuthData.userId },
  });
  const { title, carrouselWarpper } = useStyles();
  const { toggleMenu } = React.useContext<MenuContextData>(MenuContext);

  return (
    <>
      <Header
        type={'menu' as MenuTypes}
        onButtonClick={toggleMenu}
        loading={loading}
      />
      <PageContainer data-testid='newbie-select-page'>
        <Box className={title} component='section'>
          <Typography component='h1' variant='h2'>
            {NewbieSelectDictionary.TITLE}
          </Typography>
          <Typography color='textSecondary' component='p' variant='body2'>
            {NewbieSelectDictionary.SUBTITLE}
          </Typography>
        </Box>
        {data && data.buddy.newbies && (
          <Box className={carrouselWarpper} component={'section'}>
            <Carrousel newbies={data.buddy.newbies as Newbie[]} />
          </Box>
        )}
        <PlusButton disabled />
      </PageContainer>
    </>
  );
};

export default NewbieSelect;
