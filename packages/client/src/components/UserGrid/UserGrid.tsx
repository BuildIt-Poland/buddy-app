import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Newbie } from '@buddy-app/schema';
import { useAuth } from 'contexts/AuthContext';
import { ROUTES } from 'shared/routes';
import Avatar from 'atoms/Avatar';
import useTaskProgress from 'hooks/useTaskProgress';
import { getProgressInPercentages, isNewbie, isTalent } from 'utils';
import { UserGridProps, User, UserDetails } from './types';

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
      padding: theme.spacing(2),
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

const UserGrid: React.FC<UserGridProps> = ({ users }) => {
  const classes = useStyles();
  const {
    data: { role },
  } = useAuth();
  const { getBuddyProgress } = useTaskProgress();
  const newbieToRoute = isTalent(role)
    ? ROUTES.TALENT_TASKS_LIST
    : ROUTES.BUDDY_TASKS_LIST;

  const getUserDetails = (user: User): UserDetails =>
    isNewbie(user.role)
      ? {
          to: newbieToRoute.replace(':newbieId', user.id),
          progress: getProgressInPercentages(getBuddyProgress(user as Newbie)),
        }
      : {
          to: ROUTES.TALENT_SELECT_NEWBIE.replace(':buddyId', user.id),
        };

  return (
    <Grid
      component='ul'
      container
      wrap={'wrap'}
      justify='center'
      className={classes.grid}>
      {users.map(
        user =>
          user && (
            <Grid component='li' key={user.id} item className={classes.gridItem}>
              <Link className={classes.link} to={getUserDetails(user).to}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardInfo}>
                    <Avatar
                      progress={getUserDetails(user).progress}
                      name={user.name}
                      imgSrc={user.photo}
                      position={user.position || undefined}
                    />
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          )
      )}
    </Grid>
  );
};

export default UserGrid;
