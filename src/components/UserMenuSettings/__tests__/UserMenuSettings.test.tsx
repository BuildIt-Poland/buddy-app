import React from 'react';
import { create } from 'react-test-renderer';

import UserMenuSettings from '../UserMenuSettings';

jest.mock('@material-ui/core/Box', () => 'Box');
jest.mock('@material-ui/core/Typography', () => 'Typography');

describe('Component - UserMenuSettings', () => {
  test('renders correctly', () => {
    const component = create(<UserMenuSettings />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
