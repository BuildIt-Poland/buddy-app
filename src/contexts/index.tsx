import React from 'react';

import { apolloClient } from 'utils';
import { ApolloProvider } from '@apollo/react-hooks';
import theme from 'styles/theme';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import AuthProvider from 'stores/AuthProvider';
import MenuProvider from 'stores/MenuProvider';
import SnackbarProvider from 'stores/SnackbarProvider';

const AppProviders: React.FC = ({ children }) => {
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <MenuProvider>
            <SnackbarProvider>{children}</SnackbarProvider>
          </MenuProvider>
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default AppProviders;
