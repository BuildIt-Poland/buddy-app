import React from 'react';
import { create } from 'react-test-renderer';
import { MemoryRouter, Route } from 'react-router';
import BackPageContainer from '../index';

jest.mock('@material-ui/core/Box', () => 'Box');
jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('atoms/PageContainer', () => 'PageContainer');
jest.doMock('components/Header');

describe('Component - BackPageContainer', () => {
  it('renders correctly', async () => {
    const component = create(
      <MemoryRouter initialEntries={[]}>
        <Route path={''}>
          <BackPageContainer>hello world</BackPageContainer>
        </Route>
      </MemoryRouter>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
