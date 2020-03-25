import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles(theme => ({
  subHeader: {
    height: '2.5em',
    width: '40%',
  },
  avatar: {
    height: '6rem',
    width: '6rem',
    margin: theme.spacing(1, 2, 0, 1),
  },
  info: {
    height: '2.5rem',
    width: '15rem',
  },
  wrapper: {
    marginTop: theme.spacing(2),
  },
}));

const ContactDetailsPlaceHolder: React.FC = () => {
  const classes = useStyles();

  const PlaceHolderContactItem = () => (
    <>
      <Skeleton variant='text' className={classes.subHeader} />
      <Skeleton variant='text' className={classes.info} />
    </>
  );

  return (
    <Box className={classes.wrapper} display='flex'>
      <Skeleton variant='circle' className={classes.avatar} />
      <Box>
        <PlaceHolderContactItem />
        <PlaceHolderContactItem />
        <PlaceHolderContactItem />
        <PlaceHolderContactItem />
      </Box>
    </Box>
  );
};

export default ContactDetailsPlaceHolder;
