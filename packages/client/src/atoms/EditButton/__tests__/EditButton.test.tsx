import React from 'react';
import { create } from 'react-test-renderer';

import EditButton from '../EditButton';

jest.mock('@material-ui/core/Fab', () => 'Fab');
jest.mock('@material-ui/icons/Edit', () => 'EditIcon');

describe('Component - EditButton', () => {
  test('renders correctly', () => {
    const component = create(<EditButton />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
