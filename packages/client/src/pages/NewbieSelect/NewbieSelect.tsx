import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useQuery } from '@apollo/react-hooks';
import Box from '@material-ui/core/Box';
import { QueryBuddyArgs, Query, UserRole } from '@buddy-app/schema';
import { useAuth } from 'contexts/AuthContext';
import { NEWBIE_SELECT } from 'graphql/newbie-select.graphql';
import PlusButton from 'atoms/PlusButton';
import NewbieGrid from 'components/UserGrid';
import PageContainer from 'atoms/PageContainer';
import NiewbieGridPlaceHolder from 'atoms/NiewbieGridPlaceHolder';
import EmptyState from 'atoms/EmptyState';
import Header, { MenuTypes } from 'components/Header';
import { useMenu } from 'contexts/MenuContext';
import { ROUTES } from 'shared/routes';
import { isTemplate, isTalent } from 'utils';
import { NewbieSelectProps } from './types';
import DICTIONARY from './dictionary';

const useStyles = makeStyles<Theme>(theme => ({
  title: {
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(1),
    },
  },
}));

const NewbieSelect: React.FC<NewbieSelectProps> = ({ history }) => {
  const { buddyId } = useParams<QueryBuddyArgs>();
  const {
    data: { userId, role },
  } = useAuth();

  const { loading, data } = useQuery<Query, QueryBuddyArgs>(NEWBIE_SELECT, {
    variables: { buddyId: buddyId || userId },
  });
  const { toggleMenu } = useMenu();
  const { title } = useStyles();
  const isEmptyList = data && !data.buddy.newbies.length;
  const isTemplateCase = data && isTemplate(data.buddy.name);
  const addNewbieRoute = isTalent(role)
    ? ROUTES.TALENT_ADD_NEWBIE.replace(':buddyId', buddyId)
    : ROUTES.BUDDY_ADD_NEWBIE;
  const dictionary = isTemplateCase ? DICTIONARY.TEMPLATE : DICTIONARY.REGULAR;

  const goBack = () => {
    if (history.length > 2) {
      history.goBack();
    } else {
      history.push(ROUTES.BASE);
    }
  };

  const headerProps = {
    [UserRole.Newbie]: {
      type: MenuTypes.BACK,
      onButtonClick: goBack,
    },
    [UserRole.Buddy]: {
      type: MenuTypes.MENU,
      onButtonClick: toggleMenu,
    },
    [UserRole.Talent]: {
      type: MenuTypes.BACK,
      onButtonClick: goBack,
    },
  };

  return (
    <>
      <Header {...headerProps[role]} />
      <PageContainer data-testid='newbie-select-page' backGroundShape>
        <Box className={title} component='section'>
          <Typography component='h1' variant='h2'>
            {dictionary.TITLE}
          </Typography>
          <Typography color='textSecondary' component='p' variant='body2'>
            {dictionary.SUBTITLE}
          </Typography>
        </Box>
        {loading && <NiewbieGridPlaceHolder />}
        {!loading && isEmptyList && <EmptyState />}
        {data && data.buddy.newbies && <NewbieGrid users={data.buddy.newbies} />}
        <Link to={addNewbieRoute}>
          <PlusButton
            aria-label='Add newbie'
            title={DICTIONARY.PLUS_BUTTON_TITLE}
            disabled={isTemplateCase}
          />
        </Link>
      </PageContainer>
    </>
  );
};

export default NewbieSelect;
