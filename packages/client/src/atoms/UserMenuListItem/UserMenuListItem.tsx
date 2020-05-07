import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Avatar from 'atoms/Avatar';
import { User } from '@buddy-app/schema';
import { makeStyles } from '@material-ui/core/styles';
import { UserMenuListItemProps } from './types';

const useStyles = makeStyles(theme => ({
  avatar: {
    height: '5.5rem',
    marginRight: theme.spacing(1.5),
  },
  list: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  listItem: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

const UserMenuListItem: React.FC<UserMenuListItemProps> = props => {
  const { user, onItemClick } = props;
  const { avatar, list, listItem } = useStyles();
  /* istanbul ignore next */
  const handleClick = () => onItemClick((user as User).id);

  return (
    <ListItem button onClick={handleClick} className={listItem}>
      <Box className={list}>
        <Box className={avatar}>
          <Avatar type={'small'} imgSrc={(user as User).photo} />
        </Box>
        <Typography component='p' variant='body2'>
          {(user as User).name}
        </Typography>
      </Box>
    </ListItem>
  );
};

export default UserMenuListItem;
