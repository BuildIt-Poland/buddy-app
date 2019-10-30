import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import { Box, Typography } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import Avatar from '../Avatar';
import { BUDDY_BASIC_DETAILS } from '../../graphql/contact-details.graphql';
import NewbiesMenuSection from '../NewbiesMenuSection/NewbiesMenuSection';
import UserMenuDetails from '../UserMenuDetails/UserMenuDetails';

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
          <UserMenuDetails user={data && data.buddy} />
          <Divider />
          <NewbiesMenuSection newbies={data && data.buddy.newbies} />
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
