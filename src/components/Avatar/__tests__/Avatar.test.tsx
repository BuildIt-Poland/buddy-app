import React from 'react';
import { create } from 'react-test-renderer';
import Avatar from '../Avatar';

jest.mock('@material-ui/core/Grid', () => 'Grid');
jest.mock('@material-ui/core/Avatar', () => 'AvatarMaterialUI');
jest.mock('@material-ui/core/CircularProgress', () => 'CircularProgress');
jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('../../NavBar');

describe('Component - Avatar', () => {
  describe('renders correctly', () => {
    test('without props', () => {
      const component = create(<Avatar />);
      expect(component.toJSON()).toMatchSnapshot();
    });
    test('with progress bar', () => {
      const component = create(<Avatar progress={45} />);
      expect(component.toJSON()).toMatchSnapshot();
    });
    test('with name and role', () => {
      const component = create(
        <Avatar name='Tom Hanks' role='Front End Engineer' />
      );
      expect(component.toJSON()).toMatchSnapshot();
    });
    test('with type "small"', () => {
      const component = create(<Avatar type='small' />);
      expect(component.toJSON()).toMatchSnapshot();
    });
  });
});
