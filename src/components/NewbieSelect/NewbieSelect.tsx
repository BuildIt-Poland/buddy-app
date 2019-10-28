import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import theme from '../../styles/theme';
import NavBar from '../NavBar';
import Avatar from '../Avatar';
import PlusButton from '../PlusButton';

const NewbieSelect: React.FC = () => {
  return (
    <>
      <NavBar type='menu' />
      <Typography component='h2' variant='h2'>
        <Box fontWeight={theme.typography.fontWeightBold}>Your New Joiners</Box>
      </Typography>
      <Avatar
        name='Tom Hanks'
        role='Front End Engineer'
        progress={75}
        type={'regular'}
      />
      <PlusButton />
    </>
  );
};

export default NewbieSelect;
