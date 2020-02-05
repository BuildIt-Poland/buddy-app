import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Avatar from 'components/Avatar';
import theme from 'styles/theme';
import { User } from 'buddy-app-schema';
import { makeStyles } from '@material-ui/core/styles';
import { UserMenuListItemProps } from './types';

const useStyles = makeStyles({
  avatar: {
    width: '9rem',
    height: '5.5rem',
  },
  list: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  listItem: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
});

const UserMenuListItem: React.FC<UserMenuListItemProps> = props => {
  const { user, onItemClick } = props;
  const { avatar, list, listItem } = useStyles();

  return (
    <ListItem
      button
      onClick={() => onItemClick((user as User).id)}
      className={listItem}>
      <Box className={list}>
        <Typography component='p' variant='body2'>
          {(user as User).name}
        </Typography>
        <Box className={avatar}>
          <Avatar type={'small'} imgSrc={(user as User).photo} />
        </Box>
      </Box>
    </ListItem>
  );
};

export default UserMenuListItem;
