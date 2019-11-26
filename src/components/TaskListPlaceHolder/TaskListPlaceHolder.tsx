import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Grey from '@material-ui/core/colors/grey';

const useStyles = makeStyles(theme => ({
  '@keyframes placeholder': {
    '0%': {
      backgroundPosition: '0% 50%',
    },
    '50%': { backgroundPosition: '100% 50%' },
    '100%': { backgroundPosition: '0% 50%' },
  },
  subHeader: {
    height: '4rem',
    width: '15rem',
    margin: theme.spacing(1, 0),
    background: `linear-gradient(89deg, ${theme.palette.background.paper}, ${Grey[300]})`,
    backgroundSize: '600% 600%',
    animation: '$placeholder 1s ease infinite',
  },
  listItem: {
    height: '4rem',
    margin: theme.spacing(1, 0),
    background: `linear-gradient(89deg, ${theme.palette.background.paper}, ${Grey[300]})`,
    backgroundSize: '600% 600%',
    animation: '$placeholder 1s ease infinite',
  },
}));

const PlaceHolderTaskList: React.FC = () => {
  const classes = useStyles();

  const PlaceHolderSubHeader = () => <div className={classes.subHeader} />;

  const PlaceHolderListItem = () => <div className={classes.listItem} />;

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
