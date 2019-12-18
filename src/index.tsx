import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from 'serviceWorker';
import App from 'components/App';
import AppProviders from 'contexts';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'index.css';

ReactDOM.render(
  <AppProviders>
    <CssBaseline />
    <App />
  </AppProviders>,
  document.getElementById('root')
);

serviceWorker.unregister();
