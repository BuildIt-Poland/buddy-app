import cookieService from './cookie-service';

class UserService {
  isAuthenticated = () => {
    return (
      !!cookieService.getToken() &&
      !!cookieService.getUser().id &&
      !!cookieService.getUser().role
    );
  };

  getUser = () => cookieService.getUser();

  logout = () => {
    cookieService.deleteToken();
    cookieService.deleteUser();
  };
}

const userService = new UserService();

export default userService;
