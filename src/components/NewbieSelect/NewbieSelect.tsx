import React from 'react';
import Typography from '@material-ui/core/Typography';
import NavBar from '../NavBar';
import Avatar from '../Avatar';
import PlusButton from '../PlusButton';

const NewbieSelect: React.FC = () => {
  const handleNavBarClick = () => {};

  return (
    <>
      <NavBar type='menu' onClick={handleNavBarClick} />
      <Typography component='h3' variant='h3'>
        Your New Joiners
      </Typography>
      <Avatar
        name='Tom Hanks'
        role='Front End Engineer'
        progress={75}
        type='regular'
      />
      <PlusButton />
    </>
  );
};

export default NewbieSelect;
