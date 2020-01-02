import React from 'react';
import ErrorPage from 'components/ErrorPage';

const Error404: React.FC = () => {
  return (
    <ErrorPage
      data-testid='error-page-404'
      title={'404 - Page not found'}
      message={`Sorry! We looked everywhere but we can't find the page you're looking for.`}
    />
  );
};

export default Error404;
