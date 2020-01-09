import React from 'react';

export interface State {
  isOpen: boolean;
  message: string;
  title: string | undefined;
  onConfirm: (() => void) | undefined;
}

export interface DialogContextData extends State {
  showDialog: (message: string, title?: string, onConfirm?: () => void) => void;
  hideDialog: () => void;
}

export const defaultState: State = {
  isOpen: false,
  title: '',
  message: '',
  onConfirm: () => {},
};

const defaultContext: DialogContextData = {
  ...defaultState,
  showDialog: () => null,
  hideDialog: () => null,
};

const DialogContext = React.createContext<DialogContextData>(defaultContext);

export default DialogContext;
