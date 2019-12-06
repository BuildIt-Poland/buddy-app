import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/react-hooks';
import Box from '@material-ui/core/Box';
import { QueryBuddyArgs, Query, Newbie } from 'buddy-app-schema';
import AuthContext, { AuthContextData } from 'contexts/AuthContext';
import { NEWBIE_SELECT } from 'graphql/newbie-select.graphql';
import PlusButton from 'components/PlusButton';
import Carrousel from 'components/Carrousel';
import PageContainer from 'components/PageContainer';
import NewbieSelectDictionary from './newbieSelect.dictionary';

const useStyles = makeStyles(theme => ({
  subTitle: {
    color: theme.palette.text.secondary,
  },
  fabButton: {
    position: 'fixed',
    top: 'auto',
    left: 'auto',
    right: theme.spacing(3),
    bottom: theme.spacing(3),
  },
}));

const NewbieSelect: React.FC = () => {
  const classes = useStyles();
  const { data: AuthData } = useContext<AuthContextData>(AuthContext);
  const { loading, data } = useQuery<Query, QueryBuddyArgs>(NEWBIE_SELECT, {
    variables: { buddyId: AuthData.userId },
  });

  return (
    <PageContainer loading={loading} data-testid='newbie-select-page'>
      <Box marginBottom={5} component='section'>
        <Typography component='h2' variant='h2'>
          {NewbieSelectDictionary.TITLE}
        </Typography>
        <Typography className={classes.subTitle} component='p' variant='body2'>
          {NewbieSelectDictionary.SUBTITLE}
        </Typography>
      </Box>

      {data && data.buddy.newbies && (
        <Box marginBottom={2} component={'section'}>
          <Carrousel newbies={data.buddy.newbies as Newbie[]} />
        </Box>
      )}
      <PlusButton disabled className={classes.fabButton} />
    </PageContainer>
  );
};

export default NewbieSelect;
