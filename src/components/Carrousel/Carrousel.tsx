import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import { Newbie } from '../../../server/src/generated/schema-types';
import Avatar from '../Avatar';
import { ROUTES } from '../../shared/routes';

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
      {newbies.map(newbie => {
        const startDate = new Date(newbie.startDate);
        return (
          <Grid key={newbie.id} item>
            <Link
              className={classes.link}
              to={ROUTES.BUDDY_TASKS_LIST.replace(':newbieId', newbie.id)}>
              <Paper className={classes.carrouselElement}>
                <Avatar
                  progress={newbie.tasksInfo.buddyProgress * 100}
                  name={newbie.name}
                  position={newbie.position || undefined}></Avatar>
                {newbie.startDate && (
                  <Box m={2}>
                    <Typography align={'center'} component='p' variant='body2'>
                      <Box component='span' fontWeight={'bold'}>
                        Start Date
                      </Box>
                    </Typography>
                    <Typography align={'center'} component='p' variant='body2'>
                      {`${startDate.getDate()}-${startDate.getMonth()}-${startDate.getFullYear()}`}
                    </Typography>
                  </Box>
                )}
              </Paper>
            </Link>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Carrousel;
