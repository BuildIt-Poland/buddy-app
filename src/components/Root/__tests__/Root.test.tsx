import React from 'react';
import { create } from 'react-test-renderer';

import Root from '../Root';

jest.mock('@material-ui/core/Container', () => 'Container');

describe('Component - Root', () => {
  test('renders correctly', () => {
    const component = create(<Root></Root>);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
