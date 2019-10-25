import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  background: {
    position: 'fixed',
    width: '100%',
    bottom: 0,
    left: 0,
    height: '20em',
    zIndex: theme.zIndex.backgroundShape,
    fill: theme.palette.background.paper,
  },
}));

const BackgroundShape: React.FC = () => {
  const classes = useStyles();

  return (
    <svg className={classes.background}>
      <ellipse cx='70%' cy='300' rx='75%' ry='227' />
    </svg>
  );
};

export default BackgroundShape;
