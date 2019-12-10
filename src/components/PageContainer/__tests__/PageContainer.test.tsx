import React from 'react';
import { create } from 'react-test-renderer';
import PageContainer from '../PageContainer';

jest.mock('@material-ui/core/Container', () => 'Container');
jest.mock('@material-ui/core/LinearProgress', () => 'LinearProgress');
jest.mock('components/BackgroundShape', () => 'BackgroundShape');

describe('Component - PageContainer', () => {
  describe('when is loading', () => {
    it('renders correctly', async () => {
      const component = create(<PageContainer loading>hello world</PageContainer>);

      expect(component.toJSON()).toMatchSnapshot();
    });
  });

  describe('when is not loading', () => {
    it('renders correctly', async () => {
      const component = create(<PageContainer>hello world</PageContainer>);

      expect(component.toJSON()).toMatchSnapshot();
    });
  });
});
