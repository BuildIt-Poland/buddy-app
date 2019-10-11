import React from 'react';
import { create } from 'react-test-renderer';

import NewbieSelect from '../NewbieSelect';

describe('Component - NewbieSelect', () => {
  test('renders correctly', () => {
    const component = create(<NewbieSelect />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
