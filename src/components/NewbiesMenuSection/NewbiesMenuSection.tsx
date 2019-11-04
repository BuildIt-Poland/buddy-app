import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import { Box, Typography } from '@material-ui/core';
import Avatar from '../Avatar';
import { NewbiesListProps } from './types';

const NewbiesMenuSection: React.FC<NewbiesListProps> = props => {
  const { newbies } = props;
  return (
    <>
      <Typography component='p' variant='h4'>
        <Box component='strong' fontWeight={'fontWeightBold'}>
          Newbies
        </Box>
      </Typography>
      {newbies &&
        newbies.map((newbie, index) => {
          return (
            <ListItem button key={index}>
              <Typography component='p' variant='h4'>
                {newbie.name}
              </Typography>
              <Avatar type={'small'} imgSrc={newbie.photo} />
            </ListItem>
          );
        })}
    </>
  );
};

export default NewbiesMenuSection;
