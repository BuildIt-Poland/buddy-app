import React from 'react';
import renderer from 'react-test-renderer';
import SlideMenu from '../SlideMenu';

jest.mock('../../UserMenuDetails/UserMenuDetails', () => 'UserMenuDetails');
jest.mock('../../NewbiesMenuSection/NewbiesMenuSection', () => 'NewbiesMenuSection');
jest.mock('../../UserMenuSettings/UserMenuSettings', () => 'UserMenuSettings');

// TODO: FIXME - make tests pass
xdescribe('SlideMenu component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<SlideMenu />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
