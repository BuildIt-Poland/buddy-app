import React from 'react';
import { useHistory } from 'react-router';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Theme } from '@material-ui/core/';
import Box from '@material-ui/core/Box';
import { useQuery } from '@apollo/react-hooks';
import Avatar from 'atoms/Avatar';
import { useAuth } from 'contexts/AuthContext';
import { AVATAR_HEADER } from 'graphql/avatar-header.graphql';
import { Query, QueryNewbieArgs, UserRole } from '@buddy-app/schema';
import { getProgressInPercentages } from 'utils';
import { ROUTES } from 'shared/routes';
import { AvatarHeaderProps } from './types';

const useStyles = makeStyles<Theme>(theme => ({
  background: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minHeight: theme.spacing(20),
  },
}));

const AvatarHeader: React.FC<AvatarHeaderProps> = ({ newbieId, taskProgress }) => {
  const {
    data: { role },
  } = useAuth();
  const history = useHistory();
  const { background } = useStyles();

  const routes = {
    [UserRole.Buddy]: ROUTES.BUDDY_NEWBIE_DETAILS.replace(':newbieId', newbieId),
    [UserRole.Newbie]: ROUTES.NEWBIE_DETAILS,
  };

  const { loading, data } = useQuery<Query, QueryNewbieArgs>(AVATAR_HEADER, {
    variables: { newbieId },
  });

  const handleClick = () => history.push(routes[role]);

  return (
    <Box className={background} data-testid='avatar-header'>
      {data && !loading && (
        <Avatar
          name={data.newbie.name}
          imgSrc={data.newbie.photo}
          position={data.newbie.position || ''}
          progress={getProgressInPercentages(taskProgress)}
          onClick={handleClick}
        />
      )}
      {loading && <CircularProgress />}
    </Box>
  );
};

export default AvatarHeader;
