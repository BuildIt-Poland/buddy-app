import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles(theme => ({
  avatar: {
    height: '12rem',
    width: '12rem',
    marginBottom: theme.spacing(1),
  },
  title: {
    height: '5rem',
    width: '15rem',
  },
  role: {
    height: '3rem',
    width: '10rem',
  },
  gridItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '25rem',
    width: '25rem',
    borderRadius: '15%',
    boxShadow: theme.shadows[5],
    transform: 'scale(0.9)',
    margin: theme.spacing(1),
    padding: theme.spacing(2),
  },
}));

const NiewbieGridPlaceHolder: React.FC = () => {
  const classes = useStyles();

  const PlaceHolderGridItem = () => (
    <Skeleton variant='rect' className={classes.gridItem}>
      <Skeleton variant='circle' className={classes.avatar} />
      <Skeleton variant='text' className={classes.title} />
      <Skeleton variant='text' className={classes.role} />
    </Skeleton>
  );

  return (
    <Grid container wrap={'wrap'} justify='center'>
      <PlaceHolderGridItem />
      <PlaceHolderGridItem />
    </Grid>
  );
};

export default NiewbieGridPlaceHolder;
