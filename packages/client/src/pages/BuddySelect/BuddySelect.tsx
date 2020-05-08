import React, { useMemo } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useQuery } from '@apollo/react-hooks';
import Box from '@material-ui/core/Box';
import { QueryTalentArgs, Query, Buddy } from '@buddy-app/schema';
import { useAuth } from 'contexts/AuthContext';
import { useMenu } from 'contexts/MenuContext';
import { useSearch } from 'contexts/SearchContext';
import { BUDDY_SELECT } from 'graphql/buddy-select.graphql';
import Header, { MenuTypes } from 'components/Header';
import SearchBar from 'components/SearchBar';
import AddUserOptions from 'components/AddUserOptions';
import BuddyGrid from 'components/UserGrid';
import PageContainer from 'atoms/PageContainer';
import EmptyState from 'atoms/EmptyState';
import NiewbieGridPlaceHolder from 'atoms/NiewbieGridPlaceHolder';
import DICTIONARY from './dictionary';

const useStyles = makeStyles<Theme>(theme => ({
  title: {
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(1),
    },
  },
}));

const filterBuddies = (buddies: Buddy[], value: string): Buddy[] =>
  buddies.filter(
    ({ name, position }) =>
      name.toLowerCase().includes(value) ||
      (position && position.toLowerCase().includes(value))
  );

const BuddySelect: React.FC = () => {
  const {
    data: { userId },
  } = useAuth();

  const { loading, data } = useQuery<Query, QueryTalentArgs>(BUDDY_SELECT, {
    variables: { talentId: userId },
  });
  const { toggleMenu } = useMenu();
  const { title } = useStyles();
  const { searchValue } = useSearch();

  const buddies = data ? (data.talent.buddies as Buddy[]) : [];
  const filteredBuddies = useMemo(() => filterBuddies(buddies, searchValue), [
    buddies,
    searchValue,
  ]);
  const isEmptyList = data && !filteredBuddies.length;

  return (
    <>
      <Header
        type={MenuTypes.MENU}
        onButtonClick={toggleMenu}
        navItems={<SearchBar />}
      />
      <PageContainer data-testid='buddy-select-page' backGroundShape>
        <Box className={title} component='section'>
          <Typography component='h1' variant='h2'>
            {DICTIONARY.TITLE}
          </Typography>
          <Typography color='textSecondary' component='p' variant='body2'>
            {DICTIONARY.SUBTITLE}
          </Typography>
        </Box>
        {loading && <NiewbieGridPlaceHolder />}
        {!loading && isEmptyList && <EmptyState />}
        {data && <BuddyGrid users={filteredBuddies} />}
        <AddUserOptions title={DICTIONARY.PLUS_BUTTON_TITLE} />
      </PageContainer>
    </>
  );
};

export default BuddySelect;
