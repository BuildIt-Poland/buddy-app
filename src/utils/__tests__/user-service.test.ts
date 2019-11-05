import userService from '../user-service';
import cookieService from '../cookie-service';
import { UserRole } from '../../../server/src/generated/schema-types';

jest.mock('../cookie-service');

describe('Utils - userService', () => {
  describe('isAuthenticated', () => {
    it('should return true for authorised user', () => {
      const user = { id: 'id', role: UserRole.Buddy };
      jest.spyOn(cookieService, 'getToken').mockReturnValue('token');
      jest.spyOn(cookieService, 'getUser').mockReturnValue(user);

      const isAuthenticated = userService.isAuthenticated();

      expect(cookieService.getToken).toHaveBeenCalled();
      expect(cookieService.getUser).toHaveBeenCalled();
      expect(isAuthenticated).toEqual(true);
    });
  });
  describe('getUser', () => {
    it('should return user object from cookies', () => {
      const user = { id: 'id', role: UserRole.Buddy };
      jest.spyOn(cookieService, 'getUser').mockReturnValue(user);

      const expectedUser = userService.getUser();

      expect(cookieService.getUser).toHaveBeenCalled();
      expect(expectedUser).toEqual(user);
    });
  });
  describe('logout', () => {
    it('should delete user and token', () => {
      userService.logout();
      expect(cookieService.deleteToken).toHaveBeenCalled();
      expect(cookieService.deleteUser).toHaveBeenCalled();
    });
  });
});
