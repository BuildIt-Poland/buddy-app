import { User } from '../../server/src/generated/schema-types';
import cookieService from './cookie-service';

class UserService {
  isAuthenticated(): boolean {
    return (
      !!cookieService.getToken() &&
      !!cookieService.getUser().id &&
      !!cookieService.getUser().role
    );
  }

  getUser(): Pick<User, 'id' | 'role'> {
    return cookieService.getUser();
  }

  logout(): void {
    cookieService.deleteToken();
    cookieService.deleteUser();
  }
}

const userService = new UserService();

export default userService;
