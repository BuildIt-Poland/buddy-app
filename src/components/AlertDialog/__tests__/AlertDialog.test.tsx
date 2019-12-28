import React from 'react';
import { create } from 'react-test-renderer';
import AlertDialog from '../AlertDialog';

jest.mock('@material-ui/core/Button', () => 'Button');
jest.mock('@material-ui/core/Dialog', () => 'Dialog');
jest.mock('@material-ui/core/DialogActions', () => 'DialogActions');
jest.mock('@material-ui/core/DialogContent', () => 'DialogContent');
jest.mock('@material-ui/core/DialogContentText', () => 'DialogContentText');
jest.mock('@material-ui/core/DialogTitle', () => 'DialogTitle');

describe('Component - AlertDialog', () => {
  test('renders correctly', () => {
    const component = create(<AlertDialog />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
