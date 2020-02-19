import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Typography from '@material-ui/core/Typography';

import Avatar from 'components/Avatar';
import { isNewbie } from 'utils';
import { UserRole } from '@buddy-app/schema';
import { UserDetailsProps } from './types';

const useStyles = makeStyles(theme => ({
  notesTextarea: {
    width: '15rem',
    minHeight: '10rem',
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
  label: {
    fontWeight: theme.typography.fontWeightBold,
    marginTop: theme.spacing(0.5),
  },
  detailText: {
    minHeight: '1.8rem',
  },
}));

const UserDetails: React.FC<UserDetailsProps> = props => {
  const { wrapper, avatar, notesTextarea, label, detailText } = useStyles();
  const {
    photo,
    name,
    position,
    startDate,
    email,
    phoneNumber,
    notes,
    role,
  } = props.details;

  const isNotesVisible = (role: UserRole) => isNewbie(role);

  return (
    <Box className={wrapper} data-testid='contact-details-page'>
      <Box className={avatar}>
        <Avatar imgSrc={photo} />
      </Box>
      <Box>
        <Typography component='p' className={label}>
          Name
        </Typography>

        <Typography component='p' data-testid='contact-name' className={detailText}>
          {name}
        </Typography>

        <Typography component='p' className={label}>
          What I do
        </Typography>

        <Typography component='p' className={detailText}>
          {position}
        </Typography>

        <Typography component='p' className={label}>
          Start date
        </Typography>

        <Typography component='p' className={detailText}>
          {startDate}
        </Typography>

        <Typography component='p' className={label}>
          E-mail
        </Typography>
        <Typography component='p' className={detailText}>
          <Link href={`mailto:${email}`} component={'a'}>
            {email}
          </Link>
        </Typography>

        <Typography component='p' className={label}>
          Phone
        </Typography>

        <Typography component='p' className={detailText}>
          {phoneNumber}
        </Typography>
        {isNotesVisible(role as UserRole) && (
          <>
            <Typography component='p' className={label}>
              Notes
            </Typography>
            <TextareaAutosize className={notesTextarea} value={notes || ''} />
          </>
        )}
      </Box>
    </Box>
  );
};

export default UserDetails;
