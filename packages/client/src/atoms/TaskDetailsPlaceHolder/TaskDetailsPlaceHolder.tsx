import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles(theme => ({
  title: {
    height: '6rem',
    width: '70%',
    margin: theme.spacing(1, 0),
  },
  description: {
    height: '4rem',
    margin: theme.spacing(1, 0),
  },
  checkbox: {
    width: '3rem',
    height: '3rem',
  },
  status: {
    width: '15rem',
    height: '3rem',
    borderRadius: '4rem',
  },
  wrapper: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(-2.5),
  },
}));

const TaskDetailsPlaceHolder: React.FC = () => {
  const classes = useStyles();

  const PlaceHolderSubHeader = () => (
    <Box className={classes.wrapper}>
      <Box display='flex' alignItems='center' justifyContent='space-between'>
        <Skeleton variant={'text'} className={classes.title} />
        <Skeleton variant='circle' className={classes.checkbox} />
      </Box>
      <Skeleton variant='circle' className={classes.status} />
    </Box>
  );

  const PlaceHolderTaskDescription = () => (
    <>
      <Skeleton variant={'text'} className={classes.description} />
      <Skeleton variant={'text'} className={classes.description} />
      <Skeleton variant={'text'} className={classes.description} />
      <Skeleton variant={'text'} className={classes.description} />
      <Skeleton variant={'text'} className={classes.description} />
    </>
  );

  return (
    <>
      <PlaceHolderSubHeader />
      <PlaceHolderTaskDescription />
    </>
  );
};

export default TaskDetailsPlaceHolder;
