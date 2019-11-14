import React from 'react';
import { useParams } from 'react-router';
import { Box, createStyles, Theme } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useQuery } from '@apollo/react-hooks';
import Avatar from 'components/Avatar';
import AVATAR_HEADER from '../../graphql/avatar-header.graphql';

import { Query, QueryNewbieArgs } from '../../types';
import { getProgressInPercentages } from '../../utils';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    background: {
      background: theme.palette.background.paper,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      minHeight: '30rem',
    },
  })
);

const AvatarHeader: React.FC = () => {
  const { background } = useStyles();
  const { newbieId } = useParams<QueryNewbieArgs>();

  const { loading, data } = useQuery<Query, QueryNewbieArgs>(AVATAR_HEADER, {
    variables: { newbieId },
  });

  return (
    <Box className={background}>
      {data && (
        <Avatar
          name={data.newbie.name}
          imgSrc={data.newbie.photo}
          role={data.newbie.position || ''}
          progress={getProgressInPercentages(data.newbie.tasksInfo.buddyProgress)}
        />
      )}
      {loading && <CircularProgress />}
    </Box>
  );
};

export default AvatarHeader;
