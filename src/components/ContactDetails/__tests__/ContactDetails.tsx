import React from 'react';
import { create } from 'react-test-renderer';

import { MemoryRouter } from 'react-router-dom';
import ContactDetails from '../ContactDetails';
import { ROUTES } from '../../../shared/routes/routes';

describe('Component - ContactDetails', () => {
  test('renders correctly', () => {
    const component = create(
      <MemoryRouter initialEntries={[ROUTES.BASE]}>
        <ContactDetails />
      </MemoryRouter>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
