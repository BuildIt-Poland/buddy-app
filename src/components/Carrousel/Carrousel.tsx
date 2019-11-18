import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import { Newbie } from 'buddy-app-schema';
import { ROUTES } from 'shared/routes';
import Avatar from '../Avatar';

const useStyles = makeStyles(theme => ({
  carrouselElement: {
    height: '30rem',
    width: '20rem',
    padding: theme.spacing(2),
    borderRadius: '2rem',
    textDecoration: 'none',
  },
  carrousel: {
    [theme.breakpoints.down('sm')]: {
      overflowX: 'auto',
    },
  },
  link: {
    textDecoration: 'none',
  },
}));

const Carrousel: React.FC<{ newbies: Newbie[] }> = ({ newbies }) => {
  const classes = useStyles();
  const breakpointSm = useMediaQuery<Theme>(theme => theme.breakpoints.down('sm'));

  return (
    <Grid
      container
      spacing={2}
      wrap={breakpointSm ? 'nowrap' : 'wrap'}
      className={classes.carrousel}>
      {newbies.map(newbie => (
        <Grid key={newbie.id} item>
          <Link
            className={classes.link}
            to={ROUTES.BUDDY_TASKS_LIST.replace(':newbieId', newbie.id)}>
            <Paper className={classes.carrouselElement}>
              <Avatar
                progress={newbie.tasksInfo.buddyProgress * 100}
                name={newbie.name}
                role={newbie.position || undefined}></Avatar>
              {newbie.startDate && (
                <Box m={2}>
                  <Typography align={'center'} component='p' variant='body2'>
                    <Box component='span' fontWeight={'bold'}>
                      Start Date
                    </Box>
                  </Typography>
                  <Typography align={'center'} component='p' variant='body2'>
                    {newbie.startDate}
                  </Typography>
                </Box>
              )}
            </Paper>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default Carrousel;