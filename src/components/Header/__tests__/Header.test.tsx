import React from 'react';
import { create } from 'react-test-renderer';

import Header from '../Header';

jest.mock('@material-ui/core/IconButton', () => 'IconButton');
jest.mock('@material-ui/core/AppBar', () => 'AppBar');
jest.mock('@material-ui/icons/Menu', () => 'MenuIcon');
jest.mock('@material-ui/icons/ArrowBack', () => 'ArrowBackIcon');
jest.mock('@material-ui/core/Toolbar', () => 'Toolbar');

describe('Component - Header', () => {
  test('should render Header with type menu', () => {
    const component = create(<Header type={'menu'} color={'default'} />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  test('should render Header with type back', () => {
    const component = create(<Header type={'back'} />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  test('should render Header with color paper', () => {
    const component = create(<Header type={'menu'} color={'paper'} />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
