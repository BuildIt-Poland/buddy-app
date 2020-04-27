import React from 'react';
import { create } from 'react-test-renderer';

import AddUser from '../AddUser';

describe('Component - AddUser', () => {
  test('renders correctly', () => {
    const component = create(<AddUser />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
