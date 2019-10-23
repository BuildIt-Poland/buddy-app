import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';

import ThemeProvider from '@material-ui/styles/ThemeProvider';
import CssBaseline from '@material-ui/core/CssBaseline';

import AppWrapper from '../AppWrapper';
import theme from '../../styles/theme';
import { apolloClient } from '../../utils';

const App: React.FC = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppWrapper />
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
