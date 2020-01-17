import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useQuery } from '@apollo/react-hooks';
import Box from '@material-ui/core/Box';
import { QueryBuddyArgs, Query, Newbie } from 'buddy-app-schema';
import { useAuth } from 'contexts/AuthContext';
import { NEWBIE_SELECT } from 'graphql/newbie-select.graphql';
import PlusButton from 'components/PlusButton';
import NewbieGrid from 'components/NewbieGrid';
import PageContainer from 'components/PageContainer';
import NiewbieGridPlaceHolder from 'components/NiewbieGridPlaceHolder';
import Header, { MenuTypes } from 'components/Header';
import { useMenu } from 'contexts/MenuContext';
import NewbieSelectDictionary from './dictionary';

const useStyles = makeStyles<Theme>(theme => ({
  title: {
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(1),
    },
  },
  carrouselWrapper: {
    marginBottom: theme.spacing(2),
  },
}));

const NewbieSelect: React.FC = () => {
  const [
    {
      data: { userId },
    },
  ] = useAuth();

  const { loading, data } = useQuery<Query, QueryBuddyArgs>(NEWBIE_SELECT, {
    variables: { buddyId: userId },
  });
  const { toggleMenu } = useMenu();
  const { title, carrouselWrapper } = useStyles();

  return (
    <>
      <Header type={MenuTypes.MENU} onButtonClick={toggleMenu} />
      <PageContainer data-testid='newbie-select-page' backGroundShape>
        <Box className={title} component='section'>
          <Typography component='h1' variant='h2'>
            {NewbieSelectDictionary.TITLE}
          </Typography>
          <Typography color='textSecondary' component='p' variant='body2'>
            {NewbieSelectDictionary.SUBTITLE}
          </Typography>
        </Box>
        {loading && <NiewbieGridPlaceHolder />}
        {data && data.buddy.newbies && (
          <Box className={carrouselWrapper} component={'section'}>
            <NewbieGrid newbies={data.buddy.newbies as Newbie[]} />
          </Box>
        )}
        <PlusButton disabled />
      </PageContainer>
    </>
  );
};

export default NewbieSelect;
