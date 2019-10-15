import React from 'react';
import { create } from 'react-test-renderer';

import PlusButton from '../PlusButton';

jest.mock('@material-ui/core/Fab', () => 'Fab');
jest.mock('@material-ui/icons/Add', () => 'AddIcon');

describe('Component - PlusButton', () => {
  test('renders correctly', () => {
    const component = create(<PlusButton />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
