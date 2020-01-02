import React from 'react';

import PageContainer from 'components/PageContainer';
import { BrowserRouter } from 'react-router-dom';
import { ROUTES } from 'shared/routes';
import { useAuth } from 'contexts/AuthContext';

const loadAuthenticatedApp = () => import('components/AuthenticatedApp');
const AuthenticatedApp = React.lazy(loadAuthenticatedApp);
const UnauthenticatedApp = React.lazy(() => import('components/UnauthenticatedApp'));

const App: React.FC = () => {
  const [{ isAuthenticated }] = useAuth();

  React.useEffect(() => {
    loadAuthenticatedApp();
  }, []);

  return (
    <BrowserRouter basename={ROUTES.BASE}>
      <React.Suspense
        fallback={<PageContainer data-testid='loader' backGroundShape />}>
        {isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </React.Suspense>
    </BrowserRouter>
  );
};

export default App;
