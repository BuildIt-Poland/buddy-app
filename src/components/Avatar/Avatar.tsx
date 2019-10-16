import React from 'react';
import {
  Grid,
  Avatar as AvatarMaterialUI,
  makeStyles,
  CircularProgress,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  avatar: {
    margin: 10,
    width: 80,
    height: 80,
  },
  name: {
    fontSize: 20,
    fontWeight: 700,
    lineHeight: 1.2,
  },
  role: {
    fontSize: 13,
  },
});

export interface AvatarProps {
  name: string;
  progress: number;
  role: string;
}

const Avatar: React.FC<AvatarProps> = props => {
  const classes = useStyles();

  const { name, role, progress } = props;
  return (
    <>
      <Grid container justify='center' alignItems='center' direction='column'>
        <AvatarMaterialUI
          alt='Avatar'
          src='/images/avatar-placeholder.jpg'
          className={classes.avatar}
        />
        <Typography component='h3' variant='caption' className={classes.name}>
          {name}
        </Typography>
        <Typography component='h4' variant='subtitle1' className={classes.role}>
          {role}
        </Typography>
        {`${progress}%`}
        <CircularProgress variant='static' value={progress} />
      </Grid>
    </>
  );
};

export default Avatar;
