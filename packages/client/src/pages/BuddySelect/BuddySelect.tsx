import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useQuery } from '@apollo/react-hooks';
import Box from '@material-ui/core/Box';
import { QueryTalentArgs, Query } from '@buddy-app/schema';
import { useAuth } from 'contexts/AuthContext';
import { BUDDY_SELECT } from 'graphql/buddy-select.graphql';
import PlusButton from 'atoms/PlusButton';
import BuddyGrid from 'components/UserGrid';
import PageContainer from 'atoms/PageContainer';
import NiewbieGridPlaceHolder from 'atoms/NiewbieGridPlaceHolder';
import Header, { MenuTypes } from 'components/Header';
import { useMenu } from 'contexts/MenuContext';
import BuddySelectDictionary from './dictionary';

const useStyles = makeStyles<Theme>(theme => ({
  title: {
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(1),
    },
  },
}));

const BuddySelect: React.FC = () => {
  const {
    data: { userId },
  } = useAuth();

  const { loading, data } = useQuery<Query, QueryTalentArgs>(BUDDY_SELECT, {
    variables: { talentId: userId },
  });
  const { toggleMenu } = useMenu();
  const { title } = useStyles();

  return (
    <>
      <Header type={MenuTypes.MENU} onButtonClick={toggleMenu} />
      <PageContainer data-testid='newbie-select-page' backGroundShape>
        <Box className={title} component='section'>
          <Typography component='h1' variant='h2'>
            {BuddySelectDictionary.TITLE}
          </Typography>
          <Typography color='textSecondary' component='p' variant='body2'>
            {BuddySelectDictionary.SUBTITLE}
          </Typography>
        </Box>
        {loading && <NiewbieGridPlaceHolder />}
        {data && data.talent.buddies && <BuddyGrid users={data.talent.buddies} />}
        <PlusButton aria-label='Add newbie' disabled />
      </PageContainer>
    </>
  );
};

export default BuddySelect;
