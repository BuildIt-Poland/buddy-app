import React from 'react';
import renderer from 'react-test-renderer';
import SlideMenu from '../SlideMenu';

describe('SlideMenu component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<SlideMenu />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
