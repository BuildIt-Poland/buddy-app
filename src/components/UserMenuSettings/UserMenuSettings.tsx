import React, { FunctionComponent } from 'react';
import { Box, Typography } from '@material-ui/core';

interface OwnProps {}

type Props = OwnProps;

const UserMenuSettings: FunctionComponent<Props> = props => {
  return (
    <>
      <Typography component='p' variant='h4'>
        <Box component='strong' fontWeight={'fontWeightBold'}>
          Settings
        </Box>
      </Typography>
    </>
  );
};

export default UserMenuSettings;
