import Cookies from 'js-cookie';
import { User } from '../../server/src/generated/schema-types';

enum AUTH {
  TOKEN = '_t',
  USER = 'user',
}

class CookieService {
  getToken() {
    return Cookies.get(process.env.REACT_APP_AUTH_TOKEN || AUTH.TOKEN);
  }

  setToken(newToken: string) {
    return Cookies.set(process.env.REACT_APP_AUTH_TOKEN || AUTH.TOKEN, newToken);
  }

  setUser(user: Pick<User, 'id' | 'role'>) {
    Cookies.set(AUTH.USER, user);
  }

  getUser(): Pick<User, 'id' | 'role'> {
    return JSON.parse(Cookies.get(AUTH.USER) || '{}');
  }

  deleteUser() {
    Cookies.remove(AUTH.USER);
  }
  deleteToken() {
    Cookies.remove(process.env.REACT_APP_AUTH_TOKEN || AUTH.TOKEN);
  }
}

const cookieService = new CookieService();

Object.freeze(cookieService);

export default cookieService;
