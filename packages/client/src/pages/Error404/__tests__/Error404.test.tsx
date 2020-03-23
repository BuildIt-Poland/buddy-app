import React from 'react';
import { create } from 'react-test-renderer';

import Error404 from '../Error404';

jest.mock('atoms/ErrorPage', () => 'ErrorPage');

describe('Component - Error404', () => {
  test('renders correctly', () => {
    const component = create(<Error404 />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
