import React from 'react';
import { create } from 'react-test-renderer';
import NavBar from '../NavBar';

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
