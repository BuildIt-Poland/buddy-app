import React from 'react';
import { create } from 'react-test-renderer';
import UserDetails from 'components/UserDetails';
import { getBasicUserDetailsMock } from '__mocks__';
import { UserRole } from 'buddy-app-schema/build/src/generated/types';

jest.mock('@material-ui/core/Box', () => 'Box');
jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('@material-ui/core/Link', () => 'Link');

jest.mock('@material-ui/core/TextareaAutosize', () => 'TextareaAutosize');
jest.mock('components/Avatar', () => 'Avatar');

describe('Component - UserDetails', () => {
  describe('when logged in as buddy', () => {
    it('renders correctly', () => {
      const component = create(
        <UserDetails details={getBasicUserDetailsMock(UserRole.Newbie)} />
      );
      expect(component.toJSON()).toMatchSnapshot();
    });
  });
  describe('when logged in as newbie', () => {
    it('renders correctly', () => {
      const component = create(
        <UserDetails details={getBasicUserDetailsMock(UserRole.Buddy)} />
      );
      expect(component.toJSON()).toMatchSnapshot();
    });
  });
});
