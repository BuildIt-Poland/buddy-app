import React from 'react';
import { useParams } from 'react-router-dom';
import {
  makeStyles,
  TextareaAutosize,
  Typography,
  CircularProgress,
  Box,
} from '@material-ui/core';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import NavBar from '../NavBar';
import Avatar from '../Avatar';
import { ReactComponent as EllipseShape } from '../../svg/ellipse-shape-gray.svg';
import { ContactDetailsParams, NewbieData } from './types';

const useStyles = makeStyles(theme => ({
  bold: {
    fontWeight: 700,
  },
  notesTextarea: {
    width: 150,
    minHeight: 100,
    borderWidth: '1px',
    borderColor: theme.palette.primary.dark,
  },
  ellipse: {
    position: 'fixed',
    bottom: '-285px',
    left: '-56px',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '2rem',
  },
  avatar: {
    width: '10rem',
  },
}));

const CONTACT_INFO = gql`
  query getContactDetails($newbieId: ID!) {
    newbie(newbieId: $newbieId) {
      name
      position
      startDate
      email
      phoneNumber
      photo
      notes
    }
  }
`;

const ContactDetails: React.FC<any> = () => {
  const { newbieId } = useParams<ContactDetailsParams>();
  const classes = useStyles();
  const { loading, data } = useQuery<NewbieData, ContactDetailsParams>(
    CONTACT_INFO,
    {
      variables: { newbieId },
    }
  );

  const renderContactDetails = () => (
    <>
      <Box className={classes.wrapper}>
        <Box className={classes.avatar}>
          <Avatar imgSrc={data && data.newbie.photo} />
        </Box>
        <Box>
          <Typography component='p' variant='subtitle1' className={classes.bold}>
            Name
          </Typography>
          <Typography component='p'>{data && data.newbie.name}</Typography>

          <Typography component='p' className={classes.bold}>
            What I do
          </Typography>
          <Typography component='p'>{data && data.newbie.position}</Typography>

          <Typography component='p' className={classes.bold}>
            Start date
          </Typography>
          <Typography component='p'>{data && data.newbie.startDate}</Typography>

          <Typography component='p' className={classes.bold}>
            E-mail
          </Typography>
          <Typography component='p'>{data && data.newbie.email}</Typography>

          <Typography component='p' className={classes.bold}>
            Phone
          </Typography>
          <Typography component='p'>{data && data.newbie.phoneNumber}</Typography>

          <Typography component='p' className={classes.bold}>
            Notes
          </Typography>
          <TextareaAutosize
            className={classes.notesTextarea}
            value={(data && data.newbie.notes) || ''}
          />
        </Box>
      </Box>

      <EllipseShape className={classes.ellipse} />
    </>
  );

  return (
    <>
      <NavBar type='back' onClick={() => null} />
      <Typography component='h2' variant='h2'>
        Contact Details
      </Typography>
      {loading && <CircularProgress />}
      {data && renderContactDetails()}
    </>
  );
};

export default ContactDetails;
