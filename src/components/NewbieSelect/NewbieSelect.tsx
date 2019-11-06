import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useQuery } from '@apollo/react-hooks';
import CircularProgress from '@material-ui/core/CircularProgress';

import NavBar from '../NavBar';
import PlusButton from '../PlusButton';
import NEWBIE_SELECT from '../../graphql/newbieSelect.graphql';
import {
  QueryBuddyArgs,
  Query,
  Newbie,
} from '../../../server/src/generated/schema-types';
import Carrousel from '../Carrousel';
import BackgroundShape from '../BackgroundShape/';
import NewbieSelectDictionary from './newbieSelect.dictionary';

const useStyles = makeStyles(theme => ({
  carrouselElement: {
    height: '30rem',
    width: '20rem',
    padding: theme.spacing(2),
    borderRadius: '2rem',
  },
  subTitle: {
    color: theme.palette.text.secondary,
  },
  carrouselContainer: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  carrousel: {
    [theme.breakpoints.down('sm')]: {
      overflowX: 'auto',
    },
  },
  fab: {},
}));

const NewbieSelect: React.FC = () => {
  const handleNavBarClick = () => {};
  const classes = useStyles();
  const buddyId = 'ck17sl83c9gya0b17dcvttzm4';

  const { loading, data } = useQuery<Query, QueryBuddyArgs>(NEWBIE_SELECT, {
    variables: { buddyId },
  });

  return (
    <>
      <NavBar type='menu' onClick={handleNavBarClick} />
      <Grid component={'article'} container direction='column' spacing={5}>
        <Grid item>
          <Typography component='h2' variant='h2'>
            {NewbieSelectDictionary.TITLE}
          </Typography>
          <Typography className={classes.subTitle} component='p' variant='body2'>
            {NewbieSelectDictionary.SUBTITLE}
          </Typography>
        </Grid>
        {loading && (
          <Grid item>
            <CircularProgress />
          </Grid>
        )}
        {data && data.buddy.newbies && (
          <Grid item className={classes.carrouselContainer}>
            <Carrousel newbies={data.buddy.newbies as Newbie[]} />
          </Grid>
        )}
      </Grid>
      <PlusButton className={classes.fab} />
      <BackgroundShape />
    </>
  );
};

export default NewbieSelect;
