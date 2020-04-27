import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import DICTIONARY from './dictionary';

const useStyles = makeStyles(theme => ({
  emptyContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
}));

const EmptyState = () => {
  const { emptyContainer } = useStyles();
  return (
    <Box className={emptyContainer}>
      <Typography variant='h2' component='h2'>
        {DICTIONARY.TITLE}
      </Typography>
    </Box>
  );
};

export default EmptyState;
