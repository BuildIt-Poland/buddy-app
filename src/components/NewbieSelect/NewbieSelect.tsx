import React from 'react';
import Typography from '@material-ui/core/Typography';
import PlusButton from '../PlusButton';
import NavBar from '../NavBar/NavBar';

const NewbieSelect: React.FC = () => {
  const handleNavBarClick = () => {};

  return (
    <>
      <NavBar type='menu' onClick={handleNavBarClick} />
      <Typography component='h2' variant='h2'>
        Your New Joiners
      </Typography>
      <PlusButton />
    </>
  );
};

export default NewbieSelect;
