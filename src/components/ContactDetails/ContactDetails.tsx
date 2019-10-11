import React from 'react';
import { useParams } from 'react-router-dom';

const ContactDetails: React.FC = () => {
  const { id: newbieId } = useParams();

  return (
    <>
      <h1>Contact Details</h1>
      <p>ID: {newbieId}</p>
    </>
  );
};

export default ContactDetails;
