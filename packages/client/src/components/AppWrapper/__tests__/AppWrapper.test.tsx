import React from 'react';
import { create } from 'react-test-renderer';

import { MenuProvider } from 'contexts/MenuContext';
import AppWrapper from '../AppWrapper';

jest.mock('@material-ui/core/SwipeableDrawer', () => 'SwipeableDrawer');
jest.mock('components/UserMenu', () => 'UserMenu');
jest.mock('atoms/SnackBar', () => 'SnackBar');

describe('Component - AppWrapper', () => {
  test('renders correctly', () => {
    const component = create(
      <MenuProvider>
        <AppWrapper>Demo Page</AppWrapper>
      </MenuProvider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
