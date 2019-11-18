import React from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';
import theme from 'styles/theme';
import UserMenuListItem from 'components/UserMenuListItem';
import { NewbiesListProps } from './types';

const useStyles = makeStyles({
  title: {
    paddingLeft: theme.spacing(2),
  },
  wrapper: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
});

const NewbiesMenuSection: React.FC<NewbiesListProps> = props => {
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

export default NewbiesMenuSection;