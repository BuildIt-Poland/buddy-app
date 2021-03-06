import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import { create } from 'react-test-renderer';
import { AuthProvider } from 'contexts/AuthContext';
import { mockedNewbieContext } from '__mocks__';
import TaskDetailsRedirect from '../TaskDetailsRedirect';

describe('Component - TaskDetailsRedirect', () => {
  test('renders correctly', () => {
    const path = '/buddy/newbies/123/tasks/123';
    const component = create(
      <MockedProvider addTypename={false} resolvers={{}}>
        <MemoryRouter initialEntries={[path]}>
          <Route path={'/buddy/newbies/:newbieId/tasks/:taskId'}>
            <AuthProvider value={mockedNewbieContext()}>
              <TaskDetailsRedirect />
            </AuthProvider>
          </Route>
        </MemoryRouter>
      </MockedProvider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
