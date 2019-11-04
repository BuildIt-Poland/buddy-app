import cookieService from './cookie.service';

class UserService {
  get isAuthenticated() {
    return (
      !!cookieService.getToken() &&
      !!cookieService.getUser().id &&
      !!cookieService.getUser().role
    );
  }

  getUser = () => cookieService.getUser();

  logout = () => {
    cookieService.deleteToken();
    cookieService.deleteUser();
  };
}

const userService = new UserService();

Object.freeze(userService);

export default userService;
