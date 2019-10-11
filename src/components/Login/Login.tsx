import React from 'react';
import { Typography } from '@material-ui/core';

import RoundedButton from '../RoundedButton';

const Login: React.FC = () => {
  return (
    <>
      <Typography align={'center'} variant='h3' component={'h3'}>
        Buddy App
      </Typography>

      <RoundedButton fullWidth variant={'contained'} color={'primary'}>
        Login
      </RoundedButton>
    </>
  );
};

export default Login;
