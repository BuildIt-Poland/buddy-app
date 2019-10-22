import React from 'react';
import { create } from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import ContactDetails from '../ContactDetails';

jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('@material-ui/core/Box', () => 'Box');
jest.mock('@material-ui/core/TextareaAutosize', () => 'TextareaAutosize');
jest.mock('@material-ui/core/CircularProgress', () => 'CircularProgress');
jest.mock('../../Avatar', () => 'Avatar');
jest.mock('../../NavBar', () => 'NavBar');

describe('Component - ContactDetails', () => {
  const client = new ApolloClient({
    link: new ApolloLink(),
    cache: new InMemoryCache(),
  });

  const mockHistory: any = { push: jest.fn() };

  test('renders correctly', () => {
    const component = create(
      <ApolloProvider client={client}>
        <MemoryRouter initialEntries={['/buddy/newbies/1234/details']}>
          <ContactDetails history={mockHistory} />
        </MemoryRouter>
      </ApolloProvider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
