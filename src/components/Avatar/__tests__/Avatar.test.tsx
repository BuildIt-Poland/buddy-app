import React from 'react';
import { create } from 'react-test-renderer';
import Avatar from '../Avatar';

describe('Component - Avatar', () => {
  test('renders correctly', () => {
    const component = create(<Avatar />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
