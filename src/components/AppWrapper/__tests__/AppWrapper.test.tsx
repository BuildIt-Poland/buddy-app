import React from 'react';
import { create } from 'react-test-renderer';

import AppWrapper from '../AppWrapper';
jest.mock('@material-ui/core/Container', () => 'Container');

describe('Component - AppWrapper', () => {
  test('renders correctly', () => {
    const component = create(<AppWrapper />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
