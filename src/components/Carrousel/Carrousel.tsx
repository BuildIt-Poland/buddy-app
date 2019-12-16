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
    height: '25rem',
    width: '25rem',
    padding: theme.spacing(2),
    borderRadius: '10%',
    textDecoration: 'none',
    background: `linear-gradient(${theme.palette.background.default}, ${theme.palette.background.paper})`,

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    transition: '0.5s all ease',
    transform: 'rotateX(15deg) scale(0.85)',
    boxShadow: '0px 5px 10px #555',
    '&:hover': {
      transform: 'rotate(0deg) scale(1.1) translateY(10px)',
    },
  },
  carrouselElementInfo: {
    transform: 'scale(1.2)',
  },
  carrouselItem: {
    perspective: '900px',
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
                  position={newbie.position || undefined}></Avatar>
              </Box>
            </Paper>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default Carrousel;
