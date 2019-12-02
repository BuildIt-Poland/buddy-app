import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles(theme => ({
  subHeader: {
    height: '4rem',
    width: '20%',
    margin: theme.spacing(1, 0),
  },
  listItem: {
    height: '4rem',
    margin: theme.spacing(1, 0),
  },
}));

const PlaceHolderTaskList: React.FC = () => {
  const classes = useStyles();

  const PlaceHolderSubHeader = () => (
    <Skeleton variant={'text'} className={classes.subHeader} />
  );

  const PlaceHolderListItem = () => (
    <Skeleton variant={'rect'} className={classes.listItem} />
  );

  return (
    <>
      <PlaceHolderSubHeader />
      <PlaceHolderListItem />
      <PlaceHolderListItem />
      <PlaceHolderListItem />
      <PlaceHolderSubHeader />
      <PlaceHolderListItem />
      <PlaceHolderListItem />
      <PlaceHolderListItem />
    </>
  );
};

export default PlaceHolderTaskList;
