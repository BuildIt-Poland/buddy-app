import React from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';
import theme from 'styles/theme';
import Avatar from 'components/Avatar';
import { UserMenuDetailsProps } from './types';

const useStyles = makeStyles({
  wrapper: {
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  avatar: {
    width: '9rem',
  },
});

const UserMenuDetails: React.FC<UserMenuDetailsProps> = props => {
  const { user } = props;
  const classes = useStyles();
  return (
    <Box className={classes.wrapper}>
      <Box className={classes.avatar}>
        <Avatar imgSrc={user && user.photo} />
      </Box>
      <Typography component='p' variant='body1'>
        <Box component='strong' fontWeight={'fontWeightBold'}>
          {user && user.name}
        </Box>
      </Typography>
      <Typography component='p' variant='body2'>
        {user && user.email}
      </Typography>
    </Box>
  );
};

export default UserMenuDetails;
