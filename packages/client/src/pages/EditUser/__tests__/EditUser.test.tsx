import React from 'react';
import { create } from 'react-test-renderer';

import EditUser from '../EditUser';

describe('Component - EditUser', () => {
  test('renders correctly', () => {
    const component = create(<EditUser />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
