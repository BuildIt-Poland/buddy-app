import React from 'react';
import { create } from 'react-test-renderer';
import DialogProvider from 'stores/DialogProvider';
import { DialogContextData } from 'contexts/DialogContext';
import AlertDialog from '../AlertDialog';

jest.mock('@material-ui/core/Button', () => 'Button');
jest.mock('@material-ui/core/Dialog', () => 'Dialog');
jest.mock('@material-ui/core/DialogActions', () => 'DialogActions');
jest.mock('@material-ui/core/DialogContent', () => 'DialogContent');
jest.mock('@material-ui/core/DialogContentText', () => 'DialogContentText');
jest.mock('@material-ui/core/DialogTitle', () => 'DialogTitle');

describe('Component - AlertDialog', () => {
  const mockedDialogData: DialogContextData = {
    isOpen: true,
    title: 'Dummy title',
    message: 'Dummy Message',
    onConfirm: jest.fn,
    showDialog: jest.fn,
    hideDialog: jest.fn,
  };
  test('renders correctly', () => {
    const component = create(<AlertDialog />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  test('renders correctly with title message', () => {
    const component = create(
      <DialogProvider value={mockedDialogData}>
        <AlertDialog />
      </DialogProvider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
