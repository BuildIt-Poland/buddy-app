import React from 'react';
import { Box, Typography } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '../Avatar';
import { BuddyMenuSectionProps } from './types';

const BuddyMenuSection: React.FC<BuddyMenuSectionProps> = props => {
  const { buddy } = props;

  return (
    <>
      <Typography component='p' variant='h4'>
        <Box component='strong' fontWeight={'fontWeightBold'}>
          Buddy
        </Box>
      </Typography>
      <ListItem button>
        <Typography component='p' variant='h4'>
          {buddy.name}
        </Typography>
        <Avatar type={'small'} imgSrc={buddy.photo} />
      </ListItem>
    </>
  );
};

export default BuddyMenuSection;
