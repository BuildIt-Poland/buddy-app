import React from 'react';
import {
  Grid,
  Avatar as AvatarMaterialUI,
  makeStyles,
  CircularProgress,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import theme from 'styles/theme';
import { AvatarProps, AvatarType } from './types';

const useRegularTypeStyles = makeStyles({
  avatar: {
    margin: 10,
    width: 60,
    height: 60,
    marginBottom: 20,
    position: 'relative',
    zIndex: theme.zIndex.base,
  },
  progress: {
    position: 'absolute',
    top: -5,
  },
  grid: {
    position: 'relative',
  },
  cursor: {
    cursor: 'pointer',
  },
});

const useSmallTypeStyles = makeStyles({
  avatar: {
    margin: 10,
    width: 40,
    height: 40,
    marginBottom: 20,
    position: 'relative',
    zIndex: theme.zIndex.base,
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
  const DEFAULT_IMG_SRC = '/images/avatar-placeholder.svg';
  const {
    name,
    role,
    progress,
    type = AvatarType.REGULAR,
    imgSrc = DEFAULT_IMG_SRC,
    onClick,
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

  const avatarCursorStyle = onClick ? { cursor: 'pointer' } : undefined;

  return (
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
          onClick={onClick}
          style={avatarCursorStyle}
        />
        <CircularProgress
          variant='static'
          value={progress}
          className={classes[type].progress}
          {...progressBarProps[type]}
        />
        <Typography
          component='h4'
          variant={type === AvatarType.REGULAR ? 'subtitle1' : 'subtitle2'}>
          {progress && `${progress}%`}
        </Typography>
      </Grid>
      {name && (
        <Typography
          align='center'
          variant={type === AvatarType.REGULAR ? 'h4' : 'h5'}>
          <Box fontWeight={theme.typography.fontWeightBold} lineHeight='1.2'>
            {name}
          </Box>
        </Typography>
      )}
      {role && (
        <Typography
          component='h4'
          variant={type === AvatarType.REGULAR ? 'subtitle1' : 'subtitle2'}>
          {role}
        </Typography>
      )}
    </Grid>
  );
};

export default Avatar;
