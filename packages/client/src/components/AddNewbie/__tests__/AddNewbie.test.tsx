import React from 'react';
import { create } from 'react-test-renderer';

import AddNewbie from '../AddNewbie';

describe('Component - AddNewbie', () => {
  test('renders correctly', () => {
    const component = create(<AddNewbie />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
