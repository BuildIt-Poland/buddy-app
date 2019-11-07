import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';

import ThemeProvider from '@material-ui/styles/ThemeProvider';
import CssBaseline from '@material-ui/core/CssBaseline';

import theme from 'styles/theme';
import { apolloClient } from 'utils';
import AuthStore from 'context/AuthStore';
import AppRouter from '../AppRouter';

const App: React.FC = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <AuthStore>
          <CssBaseline />
          <AppRouter />
        </AuthStore>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
