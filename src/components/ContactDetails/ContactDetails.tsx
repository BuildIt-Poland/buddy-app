import React from 'react';
import { useParams } from 'react-router-dom';
import {
  makeStyles,
  TextareaAutosize,
  Typography,
  CircularProgress,
  Box,
} from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import CONTACT_DETAILS from 'graphql/contact-details.graphql';
import { ROUTES } from 'shared/routes';
import { Query, QueryNewbieArgs } from 'types';
import NavBar from '../NavBar';
import Avatar from '../Avatar';
import BackgroundShape from '../BackgroundShape/';
import { ContactDetailsProps } from './types';

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

const ContactDetails: React.FC<ContactDetailsProps> = props => {
  const { newbieId } = useParams<QueryNewbieArgs>();
  const classes = useStyles();
  const { loading, data } = useQuery<Query, QueryNewbieArgs>(CONTACT_DETAILS, {
    variables: { newbieId },
  });

  const renderContactDetails = () => (
    <>
      <Box className={classes.wrapper}>
        <Box className={classes.avatar}>
          <Avatar imgSrc={data && data.newbie.photo} />
        </Box>
        <Box>
          <Typography component='p'>
            <Box component='strong' fontWeight={'fontWeightBold'}>
              Name
            </Box>
          </Typography>

          <Typography component='p' data-testid='contact-name'>
            {data && data.newbie.name}
          </Typography>

          <Typography component='p'>
            <Box component='strong' fontWeight={'fontWeightBold'}>
              What I do
            </Box>
          </Typography>
          <Typography component='p'>{data && data.newbie.position}</Typography>

          <Typography component='p'>
            <Box component='strong' fontWeight={'fontWeightBold'}>
              Start date
            </Box>
          </Typography>
          <Typography component='p'>{data && data.newbie.startDate}</Typography>

          <Typography component='p'>
            <Box component='strong' fontWeight={'fontWeightBold'}>
              E-mail
            </Box>
          </Typography>
          <Typography component='p'>{data && data.newbie.email}</Typography>

          <Typography component='p'>
            <Box component='strong' fontWeight={'fontWeightBold'}>
              Phone
            </Box>
          </Typography>
          <Typography component='p'>{data && data.newbie.phoneNumber}</Typography>

          <Typography component='p'>
            <Box component='strong' fontWeight={'fontWeightBold'}>
              Notes
            </Box>
          </Typography>
          <TextareaAutosize
            className={classes.notesTextarea}
            value={(data && data.newbie.notes) || ''}
          />
        </Box>
      </Box>
    </>
  );

  return (
    <>
      <NavBar
        type='back'
        onClick={() => props.history.push(ROUTES.BUDDY_TASKS_LIST)}
      />
      <Typography component='h2' variant='h2'>
        Contact Details
      </Typography>
      {loading && <CircularProgress />}
      {data && renderContactDetails()}
      <BackgroundShape></BackgroundShape>
    </>
  );
};

export default ContactDetails;
