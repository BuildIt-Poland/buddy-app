import React from 'react';
import { useHistory } from 'react-router';
import { Box, createStyles, Theme } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useQuery } from '@apollo/react-hooks';
import Avatar from 'components/Avatar';
import { AVATAR_HEADER } from 'graphql/avatar-header.graphql';

import { Query, QueryNewbieArgs } from 'buddy-app-schema';
import { getProgressInPercentages } from 'utils';
import { ROUTES } from 'shared/routes';
import { AvatarHeaderProps } from './types';

const useStyles = makeStyles<Theme>(theme =>
  createStyles({
    background: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      minHeight: theme.spacing(20),
    },
  })
);

const AvatarHeader: React.FC<AvatarHeaderProps> = ({ newbieId }) => {
  const history = useHistory();
  const { background } = useStyles();

  const { loading, data } = useQuery<Query, QueryNewbieArgs>(AVATAR_HEADER, {
    variables: { newbieId },
  });

  const handleClick = () => {
    history.push(ROUTES.BUDDY_NEWBIE_DETAILS.replace(':newbieId', newbieId));
  };

  return (
    <Box className={background} data-testid='avatar-header'>
      {data && !loading && (
        <Avatar
          name={data.newbie.name}
          imgSrc={data.newbie.photo}
          position={data.newbie.position || ''}
          progress={getProgressInPercentages(data.newbie.tasksInfo.buddyProgress)}
          onClick={handleClick}
        />
      )}
      {loading && <CircularProgress />}
    </Box>
  );
};

export default AvatarHeader;
