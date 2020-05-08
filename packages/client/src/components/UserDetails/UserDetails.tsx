import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth } from 'contexts/AuthContext';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Typography from '@material-ui/core/Typography';
import Avatar from 'atoms/Avatar';
import { isNewbie } from 'utils';
import { UserDetailsProps, ContactDetail } from './types';
import DICTIONARY from './dictionary';

const useStyles = makeStyles(theme => ({
  notesTextarea: {
    width: '20rem',
    minHeight: '5rem',
    borderWidth: '1px',
    borderColor: theme.palette.primary.dark,
    borderRadius: '5px',
    padding: theme.spacing(0.5),
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

const UserDetails: React.FC<UserDetailsProps> = ({ details }) => {
  const {
    data: { role },
  } = useAuth();
  const { wrapper, avatar, notesTextarea, label, detailText } = useStyles();
  const {
    photo,
    name,
    position,
    startDate,
    email,
    phoneNumber,
    notes,
    role: userRole,
  } = details;

  const hasNotes = notes && isNewbie(userRole) && !isNewbie(role);

  const contactDetails: ContactDetail[] = [
    {
      title: DICTIONARY.NAME,
      value: name,
      visible: !!name,
      testId: 'contact-name',
    },
    {
      title: DICTIONARY.POSITION,
      value: position,
      visible: !!position,
      testId: 'contact-position',
    },
    {
      title: DICTIONARY.START_DATE,
      value: new Date(startDate).toLocaleDateString(),
      visible: !!startDate,
      testId: 'contact-start-date',
    },
    {
      title: DICTIONARY.EMAIL,
      value: (
        <Link href={`mailto:${email}`} component='a'>
          {email}
        </Link>
      ),
      visible: !!email,
      testId: 'contact-email',
    },
    {
      title: DICTIONARY.PHONE,
      value: phoneNumber,
      visible: !!phoneNumber,
      testId: 'contact-phone',
    },
  ];

  return (
    <Box className={wrapper} data-testid='contact-details-page'>
      <Box className={avatar}>
        <Avatar imgSrc={photo} />
      </Box>
      <Box>
        {contactDetails.map(
          ({ title, value, visible, testId }) =>
            visible && (
              <React.Fragment key={testId}>
                <Typography component='p' className={label}>
                  {title}
                </Typography>

                <Typography
                  component='p'
                  data-testid={testId}
                  className={detailText}>
                  {value}
                </Typography>
              </React.Fragment>
            )
        )}
        {hasNotes && (
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
