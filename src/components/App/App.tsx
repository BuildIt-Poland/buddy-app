import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';

import ThemeProvider from '@material-ui/styles/ThemeProvider';
import CssBaseline from '@material-ui/core/CssBaseline';

import theme from 'styles/theme';
import { apolloClient } from 'utils';
import AuthStore from 'reducers/AuthStore';
import MenuStore from 'reducers/MenuStore';
import AppRouter from '../AppRouter';

const App: React.FC = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <AuthStore>
          <MenuStore>
            <CssBaseline />
            <AppRouter />
          </MenuStore>
        </AuthStore>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
