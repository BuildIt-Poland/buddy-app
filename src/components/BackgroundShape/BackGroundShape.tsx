import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { colors } from 'styles/theme';
import { BackgroundShapeProps } from './types';

export const BACKGROUND_SHAPE_HEGHT = 20;

const useStyles = makeStyles(theme => ({
  background: {
    position: 'fixed',
    width: '100%',
    bottom: 0,
    left: 0,
    height: `${BACKGROUND_SHAPE_HEGHT}rem`,
    zIndex: theme.zIndex.backgroundShape,
  },
}));

const BackgroundShape: React.FC<BackgroundShapeProps> = props => {
  const classes = useStyles();
  const { fill = colors.background.paper } = props;

  return (
    <svg className={classes.background} fill={fill}>
      <ellipse cx='70%' cy='130%' rx='75%' ry='110%' />
    </svg>
  );
};

export default BackgroundShape;
