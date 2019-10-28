import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import { Box, Typography } from '@material-ui/core';
import Avatar from '../Avatar';

const useStyles = makeStyles({
  list: {
    width: '350px',
  },
  fullList: {
    width: 'auto',
  },
});

export default function SlideMenu(props: any) {
  const classes = useStyles();

  const { isMenuVisible, onClose } = props;

  return (
    <div>
      <Drawer open={isMenuVisible} onClose={onClose}>
        <div className={classes.list} role='presentation'>
          <div onClick={onClose}>X</div>
          <Avatar type={'small'} />
          <Typography component='p' variant='h4'>
            <Box component='strong' fontWeight={'fontWeightBold'}>
              Joe Doe
            </Box>
          </Typography>
          <Typography component='p' variant='h4'>
            joe.doe@wipro.com
          </Typography>
          <Divider />
          <Typography component='p' variant='h4'>
            <Box component='strong' fontWeight={'fontWeightBold'}>
              Newbies
            </Box>
          </Typography>

          <ListItem button>
            <Typography component='p' variant='h4'>
              Newbie #1
            </Typography>

            <Avatar type={'small'} />
          </ListItem>

          <ListItem button>
            <Typography component='p' variant='h4'>
              Newbie #2
            </Typography>
            <Avatar type={'small'} />
          </ListItem>

          <Divider />
          <Typography component='p' variant='h4'>
            <Box component='strong' fontWeight={'fontWeightBold'}>
              Settings
            </Box>
          </Typography>
        </div>
      </Drawer>
    </div>
  );
}
