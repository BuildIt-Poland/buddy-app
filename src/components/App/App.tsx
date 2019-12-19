import React, { useContext } from 'react';

import AuthContext, { AuthContextData } from 'contexts/AuthContext';
import PageContainer from 'components/PageContainer';
import { BrowserRouter } from 'react-router-dom';
import { ROUTES } from 'shared/routes';

const loadAuthenticatedApp = () => import('components/AuthenticatedApp');
const AuthenticatedApp = React.lazy(loadAuthenticatedApp);
const UnauthenticatedApp = React.lazy(() => import('components/UnauthenticatedApp'));

const App: React.FC = () => {
  const { isAuthenticated } = useContext<AuthContextData>(AuthContext);

  React.useEffect(() => {
    loadAuthenticatedApp();
  }, []);

  React.useEffect(() => {}, [isAuthenticated]);

  return (
    <BrowserRouter basename={ROUTES.BASE}>
      <React.Suspense
        fallback={<PageContainer data-testid='fallback-loader' backGroundShape />}>
        {isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </React.Suspense>
    </BrowserRouter>
  );
};

export default App;
