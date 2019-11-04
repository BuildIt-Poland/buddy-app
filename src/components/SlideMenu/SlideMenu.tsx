import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import { useQuery } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';
import {
  BUDDY_BASIC_DETAILS,
  NEWBIE_BASIC_DETAILS,
} from '../../graphql/contact-details.graphql';
import NewbiesMenuSection from '../NewbiesMenuSection/NewbiesMenuSection';
import UserMenuDetails from '../UserMenuDetails/UserMenuDetails';
import UserMenuSettings from '../UserMenuSettings/UserMenuSettings';
import userService from '../../utils/user.service';
import BuddyMenuSection from '../BuddyMenuSection/BuddyMenuSection';
import { isBuddy, isNewbie } from '../../utils/user-helper';

const useStyles = makeStyles({
  list: {
    width: '350px',
  },
  fullList: {
    width: 'auto',
  },
});

function SlideMenu(props: any) {
  const classes = useStyles();
  const { isMenuVisible, onClose } = props;

  const { id, role } = userService.getUser();

  const getQueryByRole = (role: any, id: any) => {
    if (isBuddy(role)) {
      return { query: BUDDY_BASIC_DETAILS, variables: { buddyId: id } };
    } else if (isNewbie(role)) {
      return { query: NEWBIE_BASIC_DETAILS, variables: { newbieId: id } };
    }
  };

  const { query, variables } = getQueryByRole(role, id) || {};

  const { data } = useQuery<any, any>(query, {
    variables,
  });

  const user = data && data[role.toLowerCase()];
  return user ? (
    <Drawer open={isMenuVisible} onClose={onClose}>
      <div className={classes.list} role='presentation'>
        <div onClick={onClose}>X</div>
        <UserMenuDetails user={user} />
        <Divider />
        {isBuddy(role) && <NewbiesMenuSection newbies={user.newbies} />}
        {isNewbie(role) && <BuddyMenuSection buddy={user.buddy} />}
        <Divider />
        <UserMenuSettings
          allowPushedNotifications={user.allowPushedNotifications}
          updatePushNotificationsSettings={() => {}}
        />
      </div>
    </Drawer>
  ) : null;
}

export default withRouter(SlideMenu);
