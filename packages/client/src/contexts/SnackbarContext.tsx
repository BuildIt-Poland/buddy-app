import React, { useState, useContext } from 'react';
import SnackBar from 'atoms/SnackBar';

interface State {
  isOpen: boolean;
  message: string;
}

interface SnackbarProviderProps {
  children: React.ReactNode;
  value?: State;
}
interface SnackbarContextData extends State {
  showSnackbar: (message: string) => void;
  hideSnackBar: () => void;
}

const defaultState: State = {
  isOpen: false,
  message: '',
};

const SnackbarContext = React.createContext<SnackbarContextData | undefined>(
  undefined
);

const SnackbarProvider = ({
  children,
  value,
}: SnackbarProviderProps): JSX.Element => {
  const [{ isOpen, message }, setSnackBarState] = useState<State>(
    value || defaultState
  );

  const showSnackbar = (message: string) =>
    setSnackBarState(state => ({ ...state, isOpen: true, message }));

  const hideSnackBar = () =>
    setSnackBarState(state => ({ ...state, isOpen: false }));

  return (
    <SnackbarContext.Provider
      value={{
        isOpen,
        message,
        showSnackbar,
        hideSnackBar,
      }}>
      <SnackBar isOpen={isOpen} message={message} onClose={hideSnackBar} />
      {children}
    </SnackbarContext.Provider>
  );
};

const useSnackBar = () => {
  const context = useContext(SnackbarContext);

  if (context === undefined) {
    throw new Error(`useSnackBar must be used within a SnackbarContext`);
  }
  return context;
};

export { SnackbarProvider, useSnackBar };
