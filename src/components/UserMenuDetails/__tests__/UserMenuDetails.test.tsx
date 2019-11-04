import React from 'react';
import { create } from 'react-test-renderer';

import UserMenuDetails from '../UserMenuDetails';

jest.mock('@material-ui/core/Fab', () => 'Fab');
jest.mock('@material-ui/icons/Add', () => 'AddIcon');

describe('Component - PlusButton', () => {
  test('renders correctly', () => {
    const component = create(
      <UserMenuDetails
        user={{ name: 'tom', email: 'hanks@wipro.com', photo: 'url' }}
      />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
