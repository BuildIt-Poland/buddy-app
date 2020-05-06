import React from 'react';
import { create } from 'react-test-renderer';
import FormPlaceHolder from '../FormPlaceHolder';

jest.mock('@material-ui/lab/Skeleton', () => 'Skeleton');

describe('Component - FormPlaceHolder', () => {
  test('renders correctly', () => {
    const component = create(<FormPlaceHolder />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
