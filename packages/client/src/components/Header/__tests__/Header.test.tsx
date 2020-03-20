import React from 'react';
import { create } from 'react-test-renderer';
import { LoadingProvider } from 'contexts/LoadingContext';
import Header, { MenuTypes, MenuColors } from '../';

jest.mock('@material-ui/core/IconButton', () => 'IconButton');
jest.mock('@material-ui/core/AppBar', () => 'AppBar');
jest.mock('@material-ui/icons/Menu', () => 'MenuIcon');
jest.mock('@material-ui/icons/ArrowBack', () => 'ArrowBackIcon');
jest.mock('@material-ui/core/Toolbar', () => 'Toolbar');
jest.mock('@material-ui/core/Box', () => 'Box');
jest.mock('@material-ui/core/LinearProgress', () => 'LinearProgress');

describe('Component - Header', () => {
  const getComponent = (props: any) =>
    create(
      <LoadingProvider>
        <Header {...props} />
      </LoadingProvider>
    );

  test('should render Header with type menu', () => {
    const component = getComponent({ type: MenuTypes.MENU });

    expect(component.toJSON()).toMatchSnapshot();
  });

  test('should render Header with type back', () => {
    const component = getComponent({ type: MenuTypes.BACK });

    expect(component.toJSON()).toMatchSnapshot();
  });

  test('should render Header with color paper', () => {
    const component = getComponent({
      type: MenuTypes.MENU,
      color: MenuColors.PAPER,
    });

    expect(component.toJSON()).toMatchSnapshot();
  });
});
