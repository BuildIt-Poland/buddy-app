import React from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';
import { Buddy } from 'buddy-app-schema';
import UserMenuListItem from 'components/UserMenuListItem';
import theme from 'styles/theme';
import { BuddyMenuSectionProps } from './types';

const useStyles = makeStyles({
  wrapper: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  title: {
    paddingLeft: theme.spacing(2),
  },
});

const BuddyMenuSection: React.FC<BuddyMenuSectionProps> = props => {
  const { wrapper, title } = useStyles();
  const { buddy, onSelect } = props;

  return (
    <Box className={wrapper}>
      <Typography component='h3' variant='body1' className={title}>
        <Box component='strong' fontWeight={'fontWeightBold'}>
          Buddy
        </Box>
      </Typography>
      <UserMenuListItem user={buddy as Buddy} onItemClick={onSelect} />
    </Box>
  );
};

export default BuddyMenuSection;
