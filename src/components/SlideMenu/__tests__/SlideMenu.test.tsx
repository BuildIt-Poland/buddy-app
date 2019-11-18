import React from 'react';
import renderer from 'react-test-renderer';
import SlideMenu from 'components/SlideMenu';

jest.mock('components/UserMenuDetails/UserMenuDetails', () => 'UserMenuDetails');
jest.mock(
  'components/NewbiesMenuSection/NewbiesMenuSection',
  () => 'NewbiesMenuSection'
);
jest.mock('components/UserMenuSettings/UserMenuSettings', () => 'UserMenuSettings');
jest.mock('buddy-app-schema', () => {});
// TODO: FIXME - make tests pass
xdescribe('SlideMenu component', () => {
  it('renders correctly', () => {
    const onCloseMock = jest.fn();
    const tree = renderer
      .create(<SlideMenu isMenuVisible={false} onClose={onCloseMock} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
