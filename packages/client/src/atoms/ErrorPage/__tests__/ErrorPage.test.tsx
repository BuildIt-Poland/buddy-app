import React from 'react';
import { create } from 'react-test-renderer';

import ErrorPage from '../ErrorPage';
jest.mock('@material-ui/core/Grid', () => 'Grid');
jest.mock('@material-ui/core/Button', () => 'Button');
jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('atoms/BackgroundShape', () => 'BackgroundShape');

describe('Component - ErrorPage', () => {
  test('renders correctly', () => {
    const component = create(<ErrorPage title={'Demo'} message={'Demo2'} />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
