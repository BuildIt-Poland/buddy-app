import React from 'react';
import { create } from 'react-test-renderer';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { MemoryRouter } from 'react-router';
import { newbieSelectMock } from '__mocks__';
import theme from 'styles/theme';
import UserGrid from '../UserGrid';

jest.mock('@material-ui/core/Grid', () => 'Grid');
jest.mock('@material-ui/core/Card', () => 'Card');
jest.mock('@material-ui/core/CardContent', () => 'CardContent');
jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('atoms/Avatar', () => 'Avatar');

describe('Component - UserGrid', () => {
  describe('renders correctly', () => {
    test('Should render correctly UserGrid', () => {
      const component = create(
        <MemoryRouter>
          <ThemeProvider theme={theme}>
            <UserGrid users={newbieSelectMock[0].result.data.buddy.newbies} />
          </ThemeProvider>
        </MemoryRouter>
      );
      expect(component.toJSON()).toMatchSnapshot();
    });
  });
});
