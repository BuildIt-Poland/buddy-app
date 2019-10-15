import React from 'react';
import { Grid, Avatar as AvatarMaterialUI, makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  avatar: {
    margin: 10,
    width: 80,
    height: 80,
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
        <p>Progress: {progress}</p>
        <Typography component='h3' variant='h3'>
          {name}
        </Typography>
        <Typography component='h3' variant='h3'>
          {role}
        </Typography>
      </Grid>
    </>
  );
};

export default Avatar;
