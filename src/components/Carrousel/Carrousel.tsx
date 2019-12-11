import React from 'react';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Newbie } from 'buddy-app-schema';
import { ROUTES } from 'shared/routes';
import Avatar from 'components/Avatar';
import { getProgressInPercentages } from 'utils';

const useStyles = makeStyles<Theme>(theme => ({
  carrouselElement: {
    height: '30rem',
    width: '20rem',
    padding: theme.spacing(2),
    borderRadius: '10%',
    textDecoration: 'none',
  },
  carrousel: {
    [theme.breakpoints.down('xs')]: {
      overflowX: 'auto',
    },
  },
  link: {
    textDecoration: 'none',
  },
}));

const Carrousel: React.FC<{ newbies: Newbie[] }> = ({ newbies }) => {
  const classes = useStyles();

  return (
    <Grid
      container
      spacing={2}
      wrap={'wrap'}
      justify='center'
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
                  progress={getProgressInPercentages(newbie.tasksInfo.buddyProgress)}
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
