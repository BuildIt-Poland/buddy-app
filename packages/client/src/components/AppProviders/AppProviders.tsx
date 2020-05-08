import React from 'react';

import { apolloClient } from 'utils';
import { ApolloProvider } from '@apollo/react-hooks';
import theme from 'styles/theme';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { AuthProvider } from 'contexts/AuthContext';
import { SearchProvider } from 'contexts/SearchContext';
import { DialogProvider } from 'contexts/DialogContext';
/* istanbul ignore file */
const AppProviders: React.FC = ({ children }) => {
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <SearchProvider>
            <DialogProvider>{children}</DialogProvider>
          </SearchProvider>
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default AppProviders;
