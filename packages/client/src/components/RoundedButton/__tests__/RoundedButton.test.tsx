import React from 'react';
import { create } from 'react-test-renderer';

import RoundedButton from '../RoundedButton';

jest.mock('@material-ui/core/Button', () => 'Button');

describe('Component - RoundedButton', () => {
  test('renders correctly', () => {
    const component = create(<RoundedButton>Rounded Button Dummy</RoundedButton>);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
