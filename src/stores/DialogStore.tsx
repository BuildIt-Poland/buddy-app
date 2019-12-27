import React, { useState } from 'react';
import DialogContext, { State, defaultState } from 'contexts/DialogContext';

interface DialogStoreProps {
  children: React.ReactNode;
}

const DialogStore = (props: DialogStoreProps): JSX.Element => {
  const [dialog, setDialog] = useState<State>(defaultState);
  const { isOpen, message, title, onConfirm } = dialog;

  const showDialog = (message: string, title?: string, onConfirm?: () => void) =>
    setDialog({ isOpen: true, message, title, onConfirm });

  const hideDialog = () => setDialog({ ...dialog, isOpen: false });

  return (
    <DialogContext.Provider
      value={{
        isOpen,
        message,
        title,
        onConfirm,
        showDialog,
        hideDialog,
      }}>
      {props.children}
    </DialogContext.Provider>
  );
};

export default DialogStore;
