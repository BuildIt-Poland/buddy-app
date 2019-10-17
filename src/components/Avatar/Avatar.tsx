import React from 'react';
import {
  Grid,
  Avatar as AvatarMaterialUI,
  makeStyles,
  CircularProgress,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { AvatarProps } from './types';

const useRegularTypeStyles = makeStyles({
  avatar: {
    margin: 10,
    width: 60,
    height: 60,
    marginBottom: 20,
  },
  name: {
    fontSize: '1rem',
    fontWeight: 700,
    lineHeight: 1.2,
  },
  subtitle: {
    fontSize: '0.75rem',
  },
  progress: {
    position: 'absolute',
    top: -5,
  },
  grid: {
    position: 'relative',
  },
});

const useSmallTypeStyles = makeStyles({
  avatar: {
    margin: 10,
    width: 40,
    height: 40,
    marginBottom: 20,
  },
  name: {
    fontSize: '0.875rem',
    fontWeight: 700,
    lineHeight: 1.2,
  },
  subtitle: {
    fontSize: '0.625rem',
  },
  progress: {
    position: 'absolute',
    top: 0,
  },
  grid: {
    position: 'relative',
  },
});

const Avatar: React.FC<AvatarProps> = props => {
  const DEFAULT_TYPE = 'regular';
  const DEFAULT_IMG_SRC = '/images/avatar-placeholder.svg';
  const {
    name,
    role,
    progress,
    type = DEFAULT_TYPE,
    imgSrc = DEFAULT_IMG_SRC,
  } = props;

  const classes = {
    regular: useRegularTypeStyles(),
    small: useSmallTypeStyles(),
  };

  const progressBarProps = {
    regular: {
      size: 90,
      thickness: 2,
    },
    small: {
      size: 60,
      thickness: 1,
    },
  };

  return (
    <>
      <Grid container justify='center' alignItems='center' direction='column'>
        <Grid
          container
          justify='center'
          alignItems='center'
          direction='column'
          className={classes[type].grid}>
          <AvatarMaterialUI
            alt='Avatar'
            src={imgSrc}
            className={classes[type].avatar}
          />
          <CircularProgress
            variant='static'
            value={progress}
            className={classes[type].progress}
            {...progressBarProps[type]}
          />
          <Typography
            component='h4'
            variant='subtitle1'
            className={classes[type].subtitle}>
            {progress && `${progress}%`}
          </Typography>
        </Grid>
        {name && (
          <Typography
            component='h3'
            variant='caption'
            className={classes[type].name}>
            {name}
          </Typography>
        )}
        {role && (
          <Typography
            component='h4'
            variant='subtitle2'
            className={classes[type].subtitle}>
            {role}
          </Typography>
        )}
      </Grid>
    </>
  );
};

export default Avatar;
