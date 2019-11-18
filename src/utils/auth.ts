import Cookies from 'js-cookie';
import { AuthPayload } from 'buddy-app-schema';

enum AUTH {
  USER = 'auth/user',
}

const key: string = process.env.REACT_APP_AUTH || AUTH.USER;

class Auth {
  _getData = (key: string) => {
    const value = Cookies.get(key) || '';
    try {
      return JSON.parse(value);
    } catch (e) {
      return value || {};
    }
  };

  getToken() {
    return this._getData(key).token;
  }

  getUser() {
    return this._getData(key);
  }

  setUser(auth: AuthPayload) {
    return Cookies.set(key, JSON.stringify(auth));
  }

  removeUser() {
    return Cookies.remove(key);
  }
}

const instance = new Auth();
Object.freeze(instance);

export default instance;
