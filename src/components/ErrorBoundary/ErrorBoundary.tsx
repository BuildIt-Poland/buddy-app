import React from 'react';
import ErrorPage from 'components/ErrorPage';
import { ErrorBoundaryProps } from './types';

class ErrorBoundary extends React.Component<any, ErrorBoundaryProps> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorPage
          data-testid='error-boundary-page'
          title={'Ups something went wrong.'}
          message={
            'Some unexpected error occurred. Please go back to the home page.'
          }
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
