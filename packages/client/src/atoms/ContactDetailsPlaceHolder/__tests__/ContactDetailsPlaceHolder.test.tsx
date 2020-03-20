import React from 'react';
import { create } from 'react-test-renderer';

import ContactDetailsPlaceHolder from '../ContactDetailsPlaceHolder';

jest.mock('@material-ui/lab/Skeleton', () => 'Skeleton');

describe('Component - ContactDetailsPlaceHolder', () => {
  test('renders correctly', () => {
    const component = create(<ContactDetailsPlaceHolder />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
