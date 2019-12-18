import React from 'react';
import { create } from 'react-test-renderer';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { MemoryRouter } from 'react-router';
import theme from 'styles/theme';
import NewbieGrid from '../NewbieGrid';

jest.mock('@material-ui/core/Grid', () => 'Grid');
jest.mock('@material-ui/core/Card', () => 'Card');
jest.mock('@material-ui/core/CardContent', () => 'CardContent');
jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('components/Avatar', () => 'Avatar');

describe('Component - NewbieGrid', () => {
  describe('renders correctly', () => {
    const newbies = [
      {
        id: 'ck17svulh9k2k0b17j31ansfk',
        photo: null,
        name: 'Test 2',
        startDate: null,
        tasksInfo: { buddyProgress: 0.5 },
      },
      {
        id: 'ck17swp2m9kcv0b17we0ibrdn',
        photo: null,
        name: 'Test 1',
        startDate: '2019-01-01',
        position: 'Front End',
        tasksInfo: { buddyProgress: 0.6 },
      },
    ];

    test('Should render correctly NewbieGrid', () => {
      const component = create(
        <MemoryRouter>
          <ThemeProvider theme={theme}>
            <NewbieGrid newbies={newbies} />
          </ThemeProvider>
        </MemoryRouter>
      );
      expect(component.toJSON()).toMatchSnapshot();
    });
  });
});
