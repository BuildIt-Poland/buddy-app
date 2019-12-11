import React from 'react';
import { create } from 'react-test-renderer';

import AppWrapper from '../AppWrapper';
jest.mock('@material-ui/core/SwipeableDrawer', () => 'SwipeableDrawer');
jest.mock('components/UserMenu', () => 'UserMenu');

describe('Component - AppWrapper', () => {
  test('renders correctly', () => {
    const component = create(<AppWrapper>Demo Page</AppWrapper>);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
