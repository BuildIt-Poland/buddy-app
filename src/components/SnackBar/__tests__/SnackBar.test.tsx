import React from 'react';
import { create } from 'react-test-renderer';

import SnackBar from '../SnackBar';

jest.mock('@material-ui/core/IconButton', () => 'IconButton');
jest.mock('@material-ui/icons/Close', () => 'CloseIcon');
jest.mock('@material-ui/core/Snackbar', () => 'Snackbar');

describe('Component - SnackBar', () => {
  test('renders correctly', () => {
    const component = create(
      <SnackBar
        message={'this is a dummy message'}
        isOpen={true}
        onClickCloseButton={() => {}}
      />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
