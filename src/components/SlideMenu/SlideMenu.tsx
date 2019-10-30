import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import { Box, Typography } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import Avatar from '../Avatar';
import { BUDDY_BASIC_DETAILS } from '../../graphql/contact-details.graphql';
import NewbiesList from '../NewbiesList/NewbiesList';

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
  const buddyId = 'ck1vxu2lgbonb09937srm6qph';
  const { data } = useQuery<any, any>(BUDDY_BASIC_DETAILS, {
    variables: { buddyId },
  });
  return (
    <div>
      <Drawer open={isMenuVisible} onClose={onClose}>
        <div className={classes.list} role='presentation'>
          <div onClick={onClose}>X</div>
          <Avatar type={'small'} />
          <Typography component='p' variant='h4'>
            <Box component='strong' fontWeight={'fontWeightBold'}>
              {data && data.buddy.name}
            </Box>
          </Typography>
          <Typography component='p' variant='h4'>
            {data && data.buddy.email}
          </Typography>
          <Divider />
          <NewbiesList newbies={data && data.buddy.newbies} />
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
