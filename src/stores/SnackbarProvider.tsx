import React, { useState } from 'react';
import SnackbarContext, { State, defaultState } from 'contexts/SnackbarContext';

interface SnackbarProviderProps {
  children: React.ReactNode;
}

const SnackbarProvider = (props: SnackbarProviderProps): JSX.Element => {
  const [snackbar, setSnackbar] = useState<State>(defaultState);
  const { isOpen, message } = snackbar;

  const showSnackbar = (message: string) => setSnackbar({ isOpen: true, message });

  const hideSnackbar = () => setSnackbar({ ...snackbar, isOpen: false });

  return (
    <SnackbarContext.Provider
      value={{
        isOpen,
        message,
        showSnackbar,
        hideSnackbar,
      }}>
      {props.children}
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
