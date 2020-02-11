import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Newbie } from '@buddy-app/schema';
import { ROUTES } from 'shared/routes';
import Avatar from 'components/Avatar';
import useTaskProgress from 'hooks/useTaskProgress';
import { getProgressInPercentages } from 'utils';

const useStyles = makeStyles<Theme>(theme => ({
  card: {
    height: '25rem',
    width: '25rem',
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
    '&:hover': {
      boxShadow: theme.shadows[7],
      transform: 'rotate(0deg) scale(1.05)',
    },
  },
  cardInfo: {
    transform: 'scale(1.2)',
  },
  gridItem: {
    perspective: '900px',
    padding: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(0.5),
    },
  },
  grid: {
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(2),
      overflowX: 'auto',
    },
    listStyleType: 'none',
    margin: 0,
    padding: 0,
  },
  link: {
    textDecoration: 'none',
  },
}));

const NewbieGrid: React.FC<{ newbies: Newbie[] }> = ({ newbies }) => {
  const classes = useStyles();
  const { getBuddyProgress } = useTaskProgress();

  return (
    <Grid
      component='ul'
      container
      wrap={'wrap'}
      justify='center'
      className={classes.grid}>
      {newbies.map(newbie => (
        <Grid component='li' key={newbie.id} item className={classes.gridItem}>
          <Link
            className={classes.link}
            to={ROUTES.BUDDY_TASKS_LIST.replace(':newbieId', newbie.id)}>
            <Card className={classes.card}>
              <CardContent className={classes.cardInfo}>
                <Avatar
                  progress={getProgressInPercentages(getBuddyProgress(newbie))}
                  name={newbie.name}
                  imgSrc={newbie.photo}
                  position={newbie.position || undefined}
                />
              </CardContent>
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default NewbieGrid;
