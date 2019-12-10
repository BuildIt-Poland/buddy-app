import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';

import ThemeProvider from '@material-ui/styles/ThemeProvider';
import CssBaseline from '@material-ui/core/CssBaseline';

import theme from 'styles/theme';
import { apolloClient } from 'utils';
import AuthStore from 'stores/AuthStore';
import SnackbarStore from 'stores/SnackbarStore';
import AppRouter from '../AppRouter';
import SnackBar from '../SnackBar';

const App: React.FC = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <AuthStore>
          <SnackbarStore>
            <CssBaseline />
            <AppRouter />
            <SnackBar />
          </SnackbarStore>
        </AuthStore>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
