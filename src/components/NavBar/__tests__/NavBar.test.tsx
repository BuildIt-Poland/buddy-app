import React from 'react';
import { create } from 'react-test-renderer';
import NavBar from '../NavBar';

jest.mock('@material-ui/core/AppBar', () => 'AppBar');
jest.mock('@material-ui/core/Toolbar', () => 'Toolbar');
jest.mock('@material-ui/core/IconButton', () => 'IconButton');
jest.mock('../../SlideMenu/SlideMenu', () => 'SlideMenu');

describe('Component - NavBar', () => {
  const onClickSpy = jest.fn();

  describe('renders correctly', () => {
    test('with "menu" type', () => {
      const component = create(<NavBar type='menu' onClick={onClickSpy} />);
      expect(component.toJSON()).toMatchSnapshot();
    });
    test('with "back" type', () => {
      const component = create(<NavBar type='back' onClick={onClickSpy} />);
      expect(component.toJSON()).toMatchSnapshot();
    });
  });
});
