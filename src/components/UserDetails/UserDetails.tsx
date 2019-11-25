import React from 'react';
import { Box, makeStyles, TextareaAutosize, Typography } from '@material-ui/core';
import Avatar from 'components/Avatar';
import { UserDetailsProps } from './types';

const useStyles = makeStyles(theme => ({
  notesTextarea: {
    width: 150,
    minHeight: 100,
    borderWidth: '1px',
    borderColor: theme.palette.primary.dark,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: theme.spacing(2),
  },
  avatar: {
    width: '10rem',
  },
}));

const UserDetails: React.FC<UserDetailsProps> = props => {
  const { wrapper, avatar, notesTextarea } = useStyles();
  const {
    photo,
    name,
    position,
    startDate,
    email,
    phoneNumber,
    notes,
  } = props.details;
  return (
    <div data-testid='contact-details-page'>
      <Box className={wrapper}>
        <Box className={avatar}>
          <Avatar imgSrc={photo} />
        </Box>
        <Box>
          <Typography component='p'>
            <Box component='strong' fontWeight={'fontWeightBold'}>
              Name
            </Box>
          </Typography>

          <Typography component='p' data-testid='contact-name'>
            {name}
          </Typography>

          <Typography component='p'>
            <Box component='strong' fontWeight={'fontWeightBold'}>
              What I do
            </Box>
          </Typography>
          <Typography component='p'>{position}</Typography>

          <Typography component='p'>
            <Box component='strong' fontWeight={'fontWeightBold'}>
              Start date
            </Box>
          </Typography>
          <Typography component='p'>{startDate}</Typography>

          <Typography component='p'>
            <Box component='strong' fontWeight={'fontWeightBold'}>
              E-mail
            </Box>
          </Typography>
          <Typography component='p'>{email}</Typography>

          <Typography component='p'>
            <Box component='strong' fontWeight={'fontWeightBold'}>
              Phone
            </Box>
          </Typography>
          <Typography component='p'>{phoneNumber}</Typography>
          {notes && (
            <>
              <Typography component='p'>
                <Box component='strong' fontWeight={'fontWeightBold'}>
                  Notes
                </Box>
              </Typography>

              <TextareaAutosize className={notesTextarea} value={notes} />
            </>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default UserDetails;
