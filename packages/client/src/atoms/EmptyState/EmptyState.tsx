import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import R2d2 from 'atoms/R2d2';
import DICTIONARY from './dictionary';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    '&>svg': {
      width: '12rem',
    },
  },
  title: {
    margin: theme.spacing(5, 0, -1),
  },
}));

const EmptyState = () => {
  const { container, title } = useStyles();
  return (
    <Box className={container}>
      <Typography variant='h2' component='h2' className={title}>
        {DICTIONARY.TITLE}
      </Typography>
      <R2d2 />
    </Box>
  );
};

export default EmptyState;
