import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles(theme => ({
  description: {
    height: '3rem',
    width: '20%',
  },
  input: {
    height: '6rem',
    margin: theme.spacing(0, 0, 1),
  },
  submit: {
    height: '7rem',
    margin: theme.spacing(3, 0),
    borderRadius: '25px',
  },
}));

const FormPlaceHolder: React.FC = () => {
  const classes = useStyles();

  const PlaceHolderTaskDescription = () => (
    <>
      <Skeleton variant={'text'} className={classes.description} />
      <Skeleton variant={'text'} className={classes.input} />
      <Skeleton variant={'text'} className={classes.description} />
      <Skeleton variant={'text'} className={classes.input} />
      <Skeleton variant={'text'} className={classes.description} />
      <Skeleton variant={'text'} className={classes.input} />
      <Skeleton variant={'text'} className={classes.submit} />
    </>
  );

  return <PlaceHolderTaskDescription />;
};

export default FormPlaceHolder;
