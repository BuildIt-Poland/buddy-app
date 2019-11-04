import React from 'react';
import { create } from 'react-test-renderer';

import AppWrapper from '../AppWrapper';

jest.mock('@material-ui/core/Container', () => 'Container');
jest.mock('../../Login', () => 'Login');
jest.mock('../../ProtectedRoute/ProtectedRoute', () => 'ProtectedRoute');
jest.mock('../../RouteRedirect/RouteRedirect', () => 'RouteRedirect');

describe('Component - AppWrapper', () => {
  test('renders correctly', () => {
    const component = create(<AppWrapper></AppWrapper>);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
