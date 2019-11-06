import React from 'react';
import { create } from 'react-test-renderer';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { MemoryRouter } from 'react-router';
import Carrousel from '../Carrousel';
import theme from '../../../styles/theme';
import { Newbie } from '../../../../server/src/generated/schema-types';

jest.mock('@material-ui/core/Grid', () => 'Grid');
jest.mock('@material-ui/core/Paper', () => 'Paper');
jest.mock('@material-ui/core/Box', () => 'Box');
jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('../../Avatar', () => 'Avatar');

describe('Component - Carrousel', () => {
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

    test('Should render correctly Carrousel', () => {
      const component = create(
        <MemoryRouter>
          <ThemeProvider theme={theme}>
            <Carrousel newbies={newbies as Newbie[]} />
          </ThemeProvider>
        </MemoryRouter>
      );
      expect(component.toJSON()).toMatchSnapshot();
    });
  });
});
