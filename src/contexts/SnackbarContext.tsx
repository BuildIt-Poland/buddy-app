import React from 'react';

export interface State {
  isOpen: boolean;
  message: string;
}

export interface SnackbarContextData extends State {
  showSnackbar: (message: string) => void;
  hideSnackbar: () => void;
}

export const defaultState: State = {
  isOpen: false,
  message: '',
};

const defaultContext: SnackbarContextData = {
  ...defaultState,
  showSnackbar: () => null,
  hideSnackbar: () => null,
};

const SnackbarContext = React.createContext<SnackbarContextData>(defaultContext);

export default SnackbarContext;
