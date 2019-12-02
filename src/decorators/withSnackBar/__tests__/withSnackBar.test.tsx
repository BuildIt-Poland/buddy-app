import React from 'react';
import { create } from 'react-test-renderer';

import withSnackBar from '../withSnackBar';

jest.mock('@material-ui/core/IconButton', () => 'IconButton');
jest.mock('@material-ui/icons/Close', () => 'CloseIcon');
jest.mock('@material-ui/core/Snackbar', () => 'Snackbar');

describe('Component - SnackBar', () => {
  const TestComponent = () => <div>Test</div>;
  const TestComponentWithSnackBar = withSnackBar(TestComponent);

  test('renders correctly', () => {
    const component = create(<TestComponentWithSnackBar />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
