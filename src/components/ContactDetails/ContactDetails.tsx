import React from 'react';
import { useParams } from 'react-router-dom';

const ContactDetails: React.FC = () => {
  let { id } = useParams();

  return (
    <>
      <h1>Contact Details</h1>
      <p>ID: {id}</p>
    </>
  );
};

export default ContactDetails;
