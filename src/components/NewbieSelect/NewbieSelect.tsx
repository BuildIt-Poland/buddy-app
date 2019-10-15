import React from 'react';
import Typography from '@material-ui/core/Typography';
import NavBar from '../NavBar/NavBar';
import Avatar from '../Avatar';

const NewbieSelect: React.FC = () => {
  const handleNavBarClick = () => {};

  return (
    <>
      <NavBar type='menu' onClick={handleNavBarClick} />
      <Typography component='h2' variant='h2'>
        Your New Joiners
      </Typography>
      <Avatar name='Tom Hanks' role='Front End Engineer' progress={50} />
    </>
  );
};

export default NewbieSelect;
