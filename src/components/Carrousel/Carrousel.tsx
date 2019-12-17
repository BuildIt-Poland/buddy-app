import React from 'react';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Newbie } from 'buddy-app-schema';
import { ROUTES } from 'shared/routes';
import Avatar from 'components/Avatar';
import Box from '@material-ui/core/Box';
import { getProgressInPercentages } from 'utils';

const useStyles = makeStyles<Theme>(theme => ({
  carrouselElement: {
    height: theme.spacing(25),
    width: theme.spacing(25),
    padding: theme.spacing(2),
    borderRadius: '15%',
    textDecoration: 'none',
    background: `linear-gradient(${theme.palette.background.default}, ${theme.palette.background.paper})`,

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    transition: '0.5s all ease',
    transform: 'rotateX(5deg) scale(0.9)',
    boxShadow: theme.shadows[5],
    [theme.breakpoints.down('xs')]: {
      transform: 'rotateX(5deg) scale(1)',
    },
    '&:hover': {
      boxShadow: theme.shadows[7],
      transform: 'rotate(0deg) scale(1.1)',
      [theme.breakpoints.down('xs')]: {
        transform: 'rotate(0deg) scale(1.2)',
      },
    },
  },
  carrouselElementInfo: {
    transform: 'scale(1.2)',
  },
  carrouselItem: {
    perspective: '900px',
    padding: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(3),
    },
  },
  carrousel: {
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(1),
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
    <Grid container wrap={'wrap'} justify='center' className={classes.carrousel}>
      {newbies.map(newbie => (
        <Grid key={newbie.id} item className={classes.carrouselItem}>
          <Link
            className={classes.link}
            to={ROUTES.BUDDY_TASKS_LIST.replace(':newbieId', newbie.id)}>
            <Paper className={classes.carrouselElement}>
              <Box className={classes.carrouselElementInfo}>
                <Avatar
                  progress={getProgressInPercentages(newbie.tasksInfo.buddyProgress)}
                  name={newbie.name}
                  imgSrc={newbie.photo}
                  position={newbie.position || undefined}
                />
              </Box>
            </Paper>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default Carrousel;
