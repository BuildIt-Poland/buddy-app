import React from 'react';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

import theme from '../../styles/theme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Typography>
        <span data-cy='root'>Buddy App</span>
      </Typography>
    </ThemeProvider>
  );
};

export default App;
