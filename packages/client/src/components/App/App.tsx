import React from 'react';

import PageContainer from 'atoms/PageContainer';
import { BrowserRouter } from 'react-router-dom';
import { ROUTES } from 'shared/routes';
import { useAuth } from 'contexts/AuthContext';

const loadAuthenticatedApp = () => import('components/AuthenticatedApp');
const AuthenticatedApp = React.lazy(loadAuthenticatedApp);
const NotAuthenticatedApp = React.lazy(() =>
  import('components/NotAuthenticatedApp')
);

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();

  React.useEffect(() => {
    loadAuthenticatedApp();
  }, []);

  return (
    <BrowserRouter basename={ROUTES.BASE}>
      <React.Suspense
        fallback={<PageContainer data-testid='loader' backGroundShape />}>
        {isAuthenticated ? <AuthenticatedApp /> : <NotAuthenticatedApp />}
      </React.Suspense>
    </BrowserRouter>
  );
};

export default App;
