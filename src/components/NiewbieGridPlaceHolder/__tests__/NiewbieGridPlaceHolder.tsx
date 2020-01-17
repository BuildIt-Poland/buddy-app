import React from 'react';
import { create } from 'react-test-renderer';
import NiewbieGridPlaceHolder from '../NiewbieGridPlaceHolder';

jest.mock('@material-ui/core/Grid', () => 'Grid');
jest.mock('@material-ui/lab/Skeleton', () => 'Skeleton');

describe('Component - NiewbieGridPlaceHolder', () => {
  test('renders correctly', () => {
    const component = create(<NiewbieGridPlaceHolder />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
