import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import theme from '../../styles/theme';
import NavBar from '../NavBar';
import Avatar from '../Avatar';
import PlusButton from '../PlusButton';

const NewbieSelect: React.FC = () => {
  const handleNavBarClick = () => {};

  return (
    <>
      <NavBar type='menu' onClick={handleNavBarClick} />
      <Typography component='h2' variant='h2'>
        <Box fontWeight={theme.typography.fontWeightBold}>Your New Joiners</Box>
      </Typography>
      <Avatar
        name='Tom Hanks'
        role='Front End Engineer'
        progress={75}
        type={'regular'}
        imgSrc={
          'https://pbs.twimg.com/profile_images/280455139/l_ecdf8f7aa81d5163129fee54d83a5e63_400x400.jpg'
        }
      />
      <PlusButton />
    </>
  );
};

export default NewbieSelect;
