import React, { useState, useContext } from 'react';
import AlertDialog from 'atoms/AlertDialog';

interface State {
  isOpen: boolean;
  message: string;
  title: string | undefined;
  onConfirm?: () => void;
}

interface DialogContextData {
  showDialog: (message: string, title?: string, onConfirm?: () => void) => void;
  hideDialog: () => void;
}

const defaultState: State = {
  isOpen: false,
  title: '',
  message: '',
};

const DialogContext = React.createContext<DialogContextData | undefined>(undefined);

interface DialogProviderProps {
  children: React.ReactNode;
  value?: DialogContextData;
}

const DialogProvider = (props: DialogProviderProps): JSX.Element => {
  const [state, setDialog] = useState<State>(defaultState);

  const showDialog = (message: string, title?: string, onConfirm?: () => void) =>
    setDialog({ isOpen: true, message, title, onConfirm });

  const hideDialog = () => setDialog(defaultState);

  const onConfirmHandler = () => {
    state.onConfirm && state.onConfirm();
    hideDialog();
  };

  return (
    <DialogContext.Provider
      value={{
        showDialog,
        hideDialog,
      }}>
      <AlertDialog
        isOpen={state.isOpen}
        message={state.message}
        onConfirm={state.onConfirm ? onConfirmHandler : undefined}
        title={state.title}
        onClose={hideDialog}
      />
      {props.children}
    </DialogContext.Provider>
  );
};

const useDialog = () => {
  const context = useContext(DialogContext);
  if (context === undefined) {
    throw new Error(`useDialog must be used within a DialogProvider`);
  }
  return context;
};

export { DialogProvider, useDialog };
