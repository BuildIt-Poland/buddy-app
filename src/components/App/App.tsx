import React, { useContext } from 'react';

import AuthContext, { AuthContextData } from 'contexts/AuthContext';
import PageContainer from 'components/PageContainer/PageContainer';

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
    <React.Suspense fallback={<PageContainer backGroundShape />}>
      {isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  );
};

export default App;
