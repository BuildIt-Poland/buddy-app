import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import { act, create, ReactTestRenderer } from 'react-test-renderer';
import waitForExpect from 'wait-for-expect';
import { CONTACT_DETAILS } from 'graphql/contact-details.graphql';
import ContactDetails from '../ContactDetails';

jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('@material-ui/core/Box', () => 'Box');
jest.mock('@material-ui/core/TextareaAutosize', () => 'TextareaAutosize');
jest.mock('@material-ui/core/CircularProgress', () => 'CircularProgress');
jest.mock('components/NavBar', () => 'Navbar');
jest.mock('components/Avatar', () => 'Avatar');
jest.mock('components/BackgroundShape', () => 'BackgroundShape');

describe('Component - ContactDetails', () => {
  const path = '/buddy/newbies/1234/details';
  const mockHistory: any = {
    push: jest.fn(),
  };
  const NewbieContactDetailsResponse = [
    {
      request: {
        query: CONTACT_DETAILS,
        variables: {
          newbieId: '1234',
        },
      },
      result: {
        data: {
          newbie: {
            name: 'Tom Hanks',
            position: 'front-end',
            startDate: '12-12-2009',
            email: 'dummy@wipro.com',
            phoneNumber: '123467890',
            photo: 'some-url',
            notes: 'some notes',
          },
        },
      },
    },
  ];

  it('renders correctly', async () => {
    let component: ReactTestRenderer;
    component = create(
      <MockedProvider mocks={NewbieContactDetailsResponse} addTypename={false}>
        <MemoryRouter initialEntries={[path]}>
          <Route path={'/buddy/newbies/:newbieId/details'}>
            <ContactDetails history={mockHistory} />
          </Route>
        </MemoryRouter>
      </MockedProvider>
    );
    expect(component).toMatchSnapshot();

    await act(async () => {
      await waitForExpect(() => {
        expect(component).toMatchSnapshot();
      });
    });
  });
});
