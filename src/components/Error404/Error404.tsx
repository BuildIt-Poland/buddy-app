import React from 'react';
import ErrorPage from 'components/ErrorPage';
import ERROR_404_DICTIONARY from './dictionary';

const Error404: React.FC = () => {
  return (
    <ErrorPage
      data-testid='error-page-404'
      title={ERROR_404_DICTIONARY.TITLE}
      message={ERROR_404_DICTIONARY.MESSAGE}
    />
  );
};

export default Error404;
