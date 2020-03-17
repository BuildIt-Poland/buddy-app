import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import theme from 'styles/theme';
import Avatar from 'atoms/Avatar';
import { UserMenuDetailsProps } from './types';

const useStyles = makeStyles({
  wrapper: {
    padding: theme.spacing(2),
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  avatar: {
    width: '9rem',
  },
});

const UserMenuDetails: React.FC<UserMenuDetailsProps> = ({ user, onClick }) => {
  const classes = useStyles();

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.avatar}>
        <Avatar imgSrc={user && user.photo} onClick={onClick} />
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
