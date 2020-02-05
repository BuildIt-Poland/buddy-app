import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import theme from 'styles/theme';
import UserMenuListItem from 'components/UserMenuListItem';
import { UserMenuNewbiesProps } from './types';

const useStyles = makeStyles({
  title: {
    paddingLeft: theme.spacing(2),
  },
  wrapper: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
});

const UserMenuNewbies: React.FC<UserMenuNewbiesProps> = props => {
  const { title, wrapper } = useStyles();
  const { newbies, onSelect } = props;

  return newbies.length ? (
    <Box className={wrapper}>
      <Typography component='h3' variant='body1' className={title}>
        <Box component='strong' fontWeight={'fontWeightBold'}>
          Newbies
        </Box>
      </Typography>
      {newbies &&
        newbies.map((newbie, index) => {
          return (
            <UserMenuListItem user={newbie} onItemClick={onSelect} key={index} />
          );
        })}
    </Box>
  ) : null;
};

export default UserMenuNewbies;
