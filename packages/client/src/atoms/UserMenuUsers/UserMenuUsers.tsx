import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import theme from 'styles/theme';
import UserMenuListItem from 'atoms/UserMenuListItem';
import { UserMenuUsersProps } from './types';

const useStyles = makeStyles({
  titleStyle: {
    paddingLeft: theme.spacing(2),
  },
  wrapper: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
});

const UserMenuUsers: React.FC<UserMenuUsersProps> = ({ title, users, onSelect }) => {
  const { titleStyle, wrapper } = useStyles();

  return users.length ? (
    <Box className={wrapper}>
      <Typography component='h3' variant='body1' className={titleStyle}>
        <Box component='strong' fontWeight={'fontWeightBold'}>
          {title}
        </Box>
      </Typography>
      {users &&
        users.map((user, index) => (
          <UserMenuListItem user={user} onItemClick={onSelect} key={index} />
        ))}
    </Box>
  ) : null;
};

export default UserMenuUsers;
