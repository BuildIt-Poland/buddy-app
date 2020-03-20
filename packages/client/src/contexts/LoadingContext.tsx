import React, { useState, useContext } from 'react';

interface State {
  loading: boolean;
}

interface LoadingProviderProps {
  children: React.ReactNode;
  value?: State;
}

interface LoadingContextData extends State {
  showLoading: () => void;
  hideLoading: () => void;
}

const defaultState: State = {
  loading: false,
};

const LoadingContext = React.createContext<LoadingContextData | undefined>(
  undefined
);

const LoadingProvider = ({ children, value }: LoadingProviderProps): JSX.Element => {
  const [{ loading }, setLoadingState] = useState<State>(value || defaultState);

  const showLoading = () => setLoadingState(state => ({ ...state, loading: true }));

  const hideLoading = () => setLoadingState(state => ({ ...state, loading: false }));

  return (
    <LoadingContext.Provider
      value={{
        loading,
        showLoading,
        hideLoading,
      }}>
      {children}
    </LoadingContext.Provider>
  );
};

const useLoading = () => {
  const context = useContext(LoadingContext);

  if (context === undefined) {
    throw new Error(`useLoading must be used within a LoadingContext`);
  }
  return context;
};

export { LoadingProvider, useLoading };
