import React, { FunctionComponent } from 'react';
import { Box, Typography } from '@material-ui/core';
import Avatar from '../Avatar';

interface OwnProps {
  user: any;
}

type Props = OwnProps;

const UserMenuDetails: FunctionComponent<Props> = props => {
  const { user } = props;

  return (
    <>
      <Avatar imgSrc={user && user.photo} />
      <Typography component='p' variant='h4'>
        <Box component='strong' fontWeight={'fontWeightBold'}>
          {user && user.name}
        </Box>
      </Typography>
      <Typography component='p' variant='h4'>
        {user && user.email}
      </Typography>
    </>
  );
};

export default UserMenuDetails;
