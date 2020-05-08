import React from 'react';
import { ReactComponent as Robot } from 'assets/svg/r2d2.svg';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  r2d2: {
    animation: `$float 3s ${theme.transitions.easing.easeInOut} infinite`,
  },
  '@keyframes float': {
    '0%': {
      transform: 'translateY(1rem)',
    },
    '50%': {
      transform: 'translateY(-1rem)',
    },
    '100%': {
      transform: 'translateY(1rem)',
    },
  },
}));

const R2d2: React.FC = () => {
  const classes = useStyles();

  return <Robot className={classes.r2d2} />;
};

export default R2d2;
