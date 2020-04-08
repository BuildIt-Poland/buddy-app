import React from 'react';
import { create } from 'react-test-renderer';
import AuthContainer from '../AuthContainer';

jest.mock('atoms/PageContainer', () => 'PageContainer');
jest.mock('@material-ui/core/Typography', () => 'Typography');

describe('Component - AuthContainer', () => {
  test('renders correctly', () => {
    const component = create(<AuthContainer title='' />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
